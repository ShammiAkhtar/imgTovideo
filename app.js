async function generateVideo() {
  const apiKey = document.getElementById('apiKey').value;
  const imageUrl = document.getElementById('imageUrl').value;
  const prompt = document.getElementById('prompt').value;

  const res = await fetch('http://localhost:5000/api/convert', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': apiKey
    },
    body: JSON.stringify({ imageUrl, prompt })
  });

  const data = await res.json();

  const output = document.getElementById('output');
  if (data.videoUrl) {
    output.innerHTML = `<video controls width="100%"><source src="${data.videoUrl}" type="video/mp4"></video>`;
  } else {
    output.innerText = 'Error generating video';
  }
}
