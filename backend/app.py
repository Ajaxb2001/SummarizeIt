from flask import Flask, request, jsonify
from flask_cors import CORS
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize, sent_tokenize

nltk.download('punkt')
nltk.download('stopwords')

app = Flask(__name__)
CORS(app)

def text_summarizer(text, length_percentage):
    stop_words = set(stopwords.words('english'))
    words = word_tokenize(text)
    freq_table = dict()
    
    for word in words:
        word = word.lower()
        if word in stop_words:
            continue
        if word in freq_table:
            freq_table[word] += 1
        else:
            freq_table[word] = 1

    sentences = sent_tokenize(text)
    sentence_value = dict()

    for sentence in sentences:
        for word, freq in freq_table.items():
            if word in sentence.lower():
                if sentence in sentence_value:
                    sentence_value[sentence] += freq
                else:
                    sentence_value[sentence] = freq

    sum_values = 0
    for sentence in sentence_value:
        sum_values += sentence_value[sentence]

    average = int(sum_values / len(sentence_value))

    # Ensure length_percentage is an integer
    length_percentage = int(length_percentage)

    # Calculate the number of sentences to include in the summary
    num_sentences = max(1, int(len(sentences) * (length_percentage / 100)))
    sorted_sentences = sorted(sentence_value.items(), key=lambda x: x[1], reverse=True)
    
    summary = ' '.join([sentence for sentence, _ in sorted_sentences[:num_sentences]])
    
    return summary

@app.route('/summarize', methods=['POST'])
def summarize():
    data = request.json
    text = data.get('text', '')
    length_percentage = data.get('length', 20)  # Default to 20% if not provided
    
    try:
        length_percentage = int(length_percentage)  # Convert to integer
    except ValueError:
        return jsonify({'error': 'Invalid length percentage provided'}), 400
    
    summary = text_summarizer(text, length_percentage)
    return jsonify({'summary': summary})

if __name__ == '__main__':
    app.run(debug=True)
