using System.IO;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;

namespace AnalyzeLog_Report.Services
{
    public class LogService : ILogService
    {
        public async Task<string> ProcessLogFileAsync(IFormFile file)
        {
            using var reader = new StreamReader(file.OpenReadStream());
            var logContent = await reader.ReadToEndAsync();

            var jsonResult = ParseLogContent(logContent);


            var jsonString = jsonResult.ToString();
            return jsonString;
        }

        public JObject ParseLogContent(string logContent)
        {
            var jsonResult = new JObject();
            var lines = logContent.Split('\n');

            foreach (var line in lines)
            {
                if (string.IsNullOrWhiteSpace(line)) continue;

                var parts = line.Split(';');
                var type = parts[0];

                try
                {
                    switch (type)
                    {
                        case "a":
                            // Handle preCalibrationData
                            jsonResult["preCalibrationData"] = new JObject
                            {
                                ["timestampStart"] = long.Parse(parts[1]),
                                ["interval"] = int.Parse(parts[2]),
                                ["weightCurveType"] = int.Parse(parts[3]),
                                ["temporalWeight"] = int.Parse(parts[4]),
                                ["workTime"] = int.Parse(parts[5]),
                                ["thresholdValue"] = decimal.Parse(parts[6]),
                                ["criteriaValue"] = int.Parse(parts[7]),
                                ["doublingRateValue"] = int.Parse(parts[8]),
                                ["frequencyPeakCurve"] = int.Parse(parts[9]),
                                //["preCalibrationValue"] = decimal.Parse(parts[10]),
                                ["preCalibrationTimestamp"] = long.Parse(parts[10])
                            };
                            break;
                        case "b":
                            // Handle data lines - dosando
                            var dataArrayB = jsonResult.ContainsKey("dataB")
                                ? jsonResult["dataB"] as JArray
                                : new JArray();

                            dataArrayB.Add(new JObject
                            {
                                ["spl"] = double.Parse(parts[1]),
                                ["doseNR15"] = double.Parse(parts[2]),
                                ["doseNHO01"] = double.Parse(parts[3]),
                                ["doseUser"] = double.Parse(parts[4])
                            });

                            jsonResult["dataB"] = dataArrayB;
                            break;
                        case "d":
                            // Handle data lines - pausado
                            var dataArrayD = jsonResult.ContainsKey("dataD")
                                ? jsonResult["dataD"] as JArray
                                : new JArray();

                            dataArrayD.Add(new JObject
                            {
                                ["spl"] = decimal.Parse(parts[1]),
                                ["doseNR15"] = decimal.Parse(parts[2]),
                                ["doseNHO01"] = decimal.Parse(parts[3]),
                                ["doseUser"] = decimal.Parse(parts[4])
                            });

                            jsonResult["dataD"] = dataArrayD;
                            break;
                        case "c":
                            // Handle footer
                            jsonResult["footer"] = new JObject
                            {
                                ["timestampEnd"] = long.Parse(parts[1]),
                                ["activeTime"] = int.Parse(parts[2]),
                                ["pausedTime"] = int.Parse(parts[3]),
                                ["postCalibrationValue"] = decimal.Parse(parts[4]),
                                ["peakCountAbove115dB"] = int.Parse(parts[5])
                            };
                            break;
                        case "e":
                            // Handle post-calibration
                            jsonResult["postCalibration"] = new JObject
                            {
                                ["postCalibrationTimestamp"] = long.Parse(parts[1]),
                                ["postCalibrationValue"] = decimal.Parse(parts[2])
                                
                            };
                            break;
                        case "f":
                            // Handle octave data
                            var dataArrayF = jsonResult.ContainsKey("dataF")
                                ? jsonResult["dataF"] as JArray
                                : new JArray();

                            dataArrayF.Add(new JObject
                            {
                                ["octaveBand"] = int.Parse(parts[1]),
                                ["value"] = decimal.Parse(parts[2])
                            });

                            jsonResult["dataF"] = dataArrayF;
                            break;
                        case "h":
                            // Handle LMin data
                            jsonResult["lMinData"] = new JObject
                            {
                                ["lMinValue"] = decimal.Parse(parts[1]),
                                ["timestamp"] = long.Parse(parts[2])
                            };
                            break;
                        case "i":
                            // Handle LMax data
                            jsonResult["lMaxData"] = new JObject
                            {
                                ["lMaxValue"] = decimal.Parse(parts[1]),
                                ["timestamp"] = long.Parse(parts[2])
                            };
                            break;
                        case "j":
                            // Handle LPK data
                            jsonResult["lPKData"] = new JObject
                            {
                                ["lPKValue"] = decimal.Parse(parts[1]),
                                ["timestamp"] = long.Parse(parts[2])
                            };
                            break;
                        case "z":
                            // Handle equipment data
                            jsonResult["equipmentData"] = new JObject
                            {
                                ["equipmentID"] = parts[1],
                                ["serialNumber"] = parts[2],
                                ["model"] = parts[3],
                                ["firmwareVersion"] = parts[4]
                            };
                            break;
                        default:
                            // Handle unexpected line types
                            Console.WriteLine($"Unexpected line type: {type}");
                            break;
                    }
                }
                catch (Exception ex)
                {
                    // Handle exceptions and log errors
                    Console.WriteLine($"Error processing line: {line}. Exception: {ex.Message}");
                }
            }

            return jsonResult;
        }

        }
}
