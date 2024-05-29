const form = document.getElementById('generate-form');
const qr = document.getElementById('qrcode');
const genQR = document.getElementById('genQR');

// Button submit
function onGenerateSubmit() {
//get Date
  const d = new Date();
  const year = d.getFullYear();
  let month = d.getUTCMonth()+1;
  if(month < 10){
  month = "0" + month
  }
  let date = d.getDate();
  if(date < 10){
  date = "0"+date
  }
  let hour = d.getHours();
  if(hour < 10){
  hour = "0"+hour
  }

  let time = d.getMinutes();
  if(time < 10){
  time = "0"+time
  }

  let seconds = d.getSeconds();
  if(seconds < 10){
  seconds = "0"+seconds
  }
  console.log("Today is " + year + " Month is "+ month + " Date is " + date + " and time is " + time);
  

  clearUI();
  
  const url = "https://api.schoolworkspro.com/staffAttendance/institution=softwarica?"+year+"-"+month+"-"+date+"T"+hour+":" + time+ ":" + seconds;
  const size = 300;

  // Validate url
  if (url === '') {
    alert('Please enter a URL');
  } else {
    showSpinner();
    // Show spinner for 1 sec
    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);

      // Generate the save button after the qr code image src is ready
      setTimeout(() => {
        // Get save url
        const saveUrl = qr.querySelector('img').src;
        // Create save button
        createSaveBtn(saveUrl);
      }, 50);
    }, 1000);
  }
};

// Generate QR code
const generateQRCode = (url, size) => {
  const qrcode = new QRCode('qrcode', {
    text: url,
    width: size,
    height: size,
  });
};

// Clear QR code and save button
const clearUI = () => {
  qr.innerHTML = '';
  const saveBtn = document.getElementById('save-link');
  if (saveBtn) {
    saveBtn.remove();
  }
};

// Show spinner
const showSpinner = () => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'block';
};

// Hide spinner
const hideSpinner = () => {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'none';
};

// Create save button to download QR code as image
const createSaveBtn = (saveUrl) => {
  const link = document.createElement('a');
  link.id = 'save-link';
  link.classList =
    'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
  link.href = './attend.html';
  link.innerHTML = 'Go To Login';
  document.getElementById('generated').appendChild(link);
};

hideSpinner();

//windows.onload('submit', onGenerateSubmit);