import Debug "mo:base/Debug";
import Text "mo:base/Text";
import LLM "mo:llm";

persistent actor QuizBackend {
    
    stable var currentQuestion : Text = "";
    stable var correctAnswer : Text = "";

    public func generateQuestion(topic: Text) : async Text {
        let input = "Create one essay question about \"" # topic # "\" without any introductory text, just display the question itself.";
        let response = await LLM.prompt(#Llama3_1_8B, input);
        
        currentQuestion := response;
        correctAnswer := "The correct answer";
        return response;
    };

    public func evaluateAnswer(userAnswer: Text) : async Text {
        let messages : [LLM.ChatMessage] = [
            {
                role = #system_;
                content = "You are a helpful assistant.";
            },
            {
                role = #user;
                content = "Is the answer '" # userAnswer # "' correct for the question '" # currentQuestion # "'?";
            }
        ];
        
        let response = await LLM.chat(#Llama3_1_8B, messages);
        return response;
    };
};
