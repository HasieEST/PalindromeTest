//Type Constructor for words array, includes word and expected boolen value.
type Word = {
    word: string,
    expectedboolean: boolean
}
//Added :string to word to make sure that IDE wouldn't yell at the coder.
function isPalindrome(word: string) {
    //If word is a string, clean it up.
    if (typeof word === 'string') {
        const cleanword = word.toLowerCase().trim();
        //Check if it is palindrome.
        return cleanword === cleanword.split('').reverse().join('');
    }
    //Incase inputed value is not a word.
    return false;
}

// Array of words, that are checked for Palindrome, has some values in for test purposes.
const words: Word[] = [
    { word: "anna", expectedboolean: true },
    { word: "Anna", expectedboolean: true },
    { word: "anna ", expectedboolean: true },
    { word: "YellowSubmarine", expectedboolean: false }
];
// Table updating funciton, takes tbody element with id 'results' and adds every word, that is found within words list. HTML file has bootstrap cdn added, allowing updatetable to add bg-success or bg-danger based on isPalindrome function results.
function updateTable() {
    const tbody = document.getElementById('results') as HTMLTableElement;
    tbody.innerHTML = '';
    for (let i = 0; i < words.length; i++) {
        const tr = document.createElement('tr') as HTMLTableRowElement;
        const tdSeq = document.createElement('td') as HTMLTableCellElement;
        tdSeq.innerText = (i + 1).toString();
        const tdWord = document.createElement('td') as HTMLTableCellElement;
        tdWord.innerText = words[i].word;
        const tdResult = document.createElement('td') as HTMLTableCellElement;
        if (isPalindrome(words[i].word) === words[i].expectedboolean) {
            // If expectedboolean and isPalindrome result have same values.
            tdResult.classList.add('bg-success');
        } else {
            tdResult.classList.add('bg-danger');
        }
        tr.append(tdSeq);
        tr.append(tdWord);
        tr.append(tdResult);
        tbody.appendChild(tr);
    }
}


// Simple function to add user inputed word to the list and call updateTable to show results for user.
function addListWord(event: Event) {
    event.preventDefault();
    //Query word input value
    const wordInput = document.getElementById('wordInput') as HTMLInputElement;
    const wordValue = wordInput.value;
    //Query expected boolean value
    const expectedbooleanInput = document.getElementById('expectedValue') as HTMLSelectElement;
    const expectedbooleanValue = expectedbooleanInput.value === 'true' ? true : false;
    //Push queried information to Words Array
    words.push({ word: wordValue, expectedboolean: expectedbooleanValue });
    updateTable();
    wordInput.value = ''
}
// Eventlisteners, allows us on full pageload to add a new word for palindrome check, initial call out of updateTable() to show demo words.
window.addEventListener('load', () => {
    const addWordToList = document.getElementById('wordSubmit')!;
    addWordToList.addEventListener('click', addListWord);
    updateTable();
})


// Console log for test values to confirm that isPalindrome function works.
console.log(isPalindrome("anna") === true);
console.log(isPalindrome("Anna") === true);
console.log(isPalindrome("anna ") === true);
console.log(isPalindrome("YellowSubmarine") === false);