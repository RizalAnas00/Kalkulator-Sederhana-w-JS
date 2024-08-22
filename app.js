// Variabel untuk menyimpan kalkulasi saat ini
let currentInput = '';
let previousInput = '';
let operator = '';
let resultDisplayed = false;

// Mendapatkan referensi elemen-elemen
const resultElement = document.getElementById('result');
const numberButtons = document.querySelectorAll('#number-box button');
const operatorButtons = document.querySelectorAll('#operator-box button');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const equalButton = document.getElementById('equal');

// Event listener untuk tombol angka
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (resultDisplayed) {
            currentInput = ''; // Hapus input jika hasil ditampilkan
            resultDisplayed = false;
        }
        currentInput += button.innerText; // Tambahkan angka ke input

        // Perbarui tampilan hasil untuk menampilkan angka setelah operator
        if (operator) {
            resultElement.innerText = `${previousInput} ${operator} ${currentInput}`;
        } else {
            resultElement.innerText = currentInput;
        }
    });
});

// Event listener untuk tombol operator
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (currentInput === '') return; // Abaikan jika tidak ada input
        if (previousInput !== '') calculate(); // Hitung jika ada input sebelumnya

        operator = button.innerText; // Simpan operator yang dipilih
        previousInput = currentInput; // Simpan input saat ini sebagai input sebelumnya
        currentInput = ''; // Hapus input saat ini

        // Tampilkan operator dan input sebelumnya di tampilan hasil
        resultElement.innerText = `${previousInput} ${operator}`;
    });
});

// Event listener untuk tombol sama dengan
equalButton.addEventListener('click', () => {
    if (previousInput === '' || currentInput === '') return; // Pastikan kedua input tersedia
    calculate(); // Lakukan perhitungan
    resultDisplayed = true; // Tandai bahwa hasil telah ditampilkan
});

// Event listener untuk tombol hapus
clearButton.addEventListener('click', () => {
    currentInput = '';
    previousInput = '';
    operator = '';
    resultElement.innerText = '0'; // Reset tampilan
});

// Event listener untuk tombol hapus karakter terakhir
deleteButton.addEventListener('click', () => {
    currentInput = currentInput.slice(0, -1); // Hapus karakter terakhir

    // Perbarui tampilan hasil jika ada operator, jika tidak tampilkan angka saat ini
    if (operator) {
        resultElement.innerText = `${previousInput} ${operator} ${currentInput || '0'}`;
    } else {
        resultElement.innerText = currentInput || '0';
    }
});

// Fungsi untuk melakukan perhitungan
function calculate() {
    let result;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '-':
            result = prev - curr;
            break;
        case 'x':
            result = prev * curr;
            break;
        case '/':
            result = curr === 0 ? 'Error' : prev / curr;
            break;
        case '%':
            result = prev % curr;
            break;
        default:
            return;
    }

    // Tampilkan hasil dan simpan hasil sebagai input sebelumnya
    resultElement.innerText = result;
    previousInput = result.toString();
    currentInput = ''; // Hapus input saat ini
    operator = ''; // Hapus operator
}
