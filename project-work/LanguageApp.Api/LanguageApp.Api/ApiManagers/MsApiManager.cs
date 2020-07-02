namespace LanguageApp.Api.ApiManagers
{
    using System;
    using System.Threading.Tasks;

    using Microsoft.CognitiveServices.Speech;
    using Microsoft.CognitiveServices.Speech.Audio;
    using Microsoft.Extensions.Configuration;

    public class MsApiManager
    {
        private readonly IConfiguration configuration;

        private readonly string key;

        private readonly string region;

        public MsApiManager(IConfiguration configuration)
        {
            this.configuration = configuration;
            key = configuration["Api:MsKey"];
            region = configuration["Api:MsKeyRegion"];
        }

        public async Task<byte[]> SynthesisToAudioFromTextAsync(string text)
        {
            var config = SpeechConfig.FromSubscription(key, region);

            using (var audioOutputStream = AudioOutputStream.CreatePullStream())
            {
                using (var output = AudioConfig.FromStreamOutput(audioOutputStream))
                {
                    using (var synthesizer = new SpeechSynthesizer(config, output))
                    {
                        var result = await synthesizer.SpeakTextAsync(text).ConfigureAwait(false);

                        if (result.Reason == ResultReason.SynthesizingAudioCompleted)
                            return result.AudioData;

                        string error = $"Reason: {result.Reason}";
                        if (result.Reason == ResultReason.Canceled)
                        {
                            var cancellation = SpeechSynthesisCancellationDetails.FromResult(result);
                            error += $" ErrorCode: {cancellation.ErrorCode} ErrorDetails: {cancellation.ErrorDetails}";
                        }

                        throw new Exception(error);
                    }
                }
            }
        }

        public async Task<string> TranslateSpeechToTextAsync(string fileUrl)
        {
            var config = SpeechConfig.FromSubscription(key, region);
            string fromLanguage = "en-US";
            config.SpeechRecognitionLanguage = fromLanguage;

            using (var audioConfig = AudioConfig.FromWavFileInput(fileUrl))
            {
                using (var recognizer = new SpeechRecognizer(config, audioConfig))
                {
                    var result = await recognizer.RecognizeOnceAsync().ConfigureAwait(false);

                    string error = $"Reason: {result.Reason}";

                    switch (result.Reason)
                    {
                        case ResultReason.RecognizedSpeech:
                            return result.Text;
                        case ResultReason.NoMatch:
                            return string.Empty;
                        case ResultReason.Canceled:
                            var cancellation = CancellationDetails.FromResult(result);
                            error += $"CANCELED: Reason={cancellation.Reason}";

                            if (cancellation.Reason == CancellationReason.Error)
                            {
                                error += $"CANCELED: ErrorCode={cancellation.ErrorCode}";
                                error += $"CANCELED: ErrorDetails={cancellation.ErrorDetails}";
                                error += "CANCELED: Did you update the subscription info?";
                            }

                            break;
                    }

                    throw new Exception(error);
                }
            }
        }
    }
}
