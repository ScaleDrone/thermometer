// PS! Replace this with your own channel ID
// If you use this channel ID your app will stop working in the near future
const CHANNEL_ID = 'S9zR90COZmbxn8iW';

const drone = new ScaleDrone(CHANNEL_ID);

drone.on('close', event => console.log('Connection was closed', event));
drone.on('error', error => console.error(error));

const room = drone.subscribe('temperature', {
  historyCount: 1 // ask for the latest message from history
});

room.on('history_message', ({data}) => {
  console.log(data);
  updateTemperatureDOM(data.temperature);
});

room.on('data', data => {
  console.log(data);
  updateTemperatureDOM(data.temperature);
});

//------------- DOM STUFF

const DOM = {
  updateButton: document.querySelector('button'),
  temperatureLabel: document.querySelector('.temperature'),
  body: document.body,
};

DOM.updateButton.addEventListener('click', sendMessage);

function sendMessage() {
  // This data could be sent by your server instead
  drone.publish({
    room: 'temperature',
    message: {
      temperature: Math.round(Math.random() * 80 - 35)
    },
  });
}

function updateTemperatureDOM(temperature) {
  DOM.temperatureLabel.textContent = `${temperature}°C`;
  if (temperature > 40) {
    DOM.body.style.backgroundColor = '#e8511d';
  } else if (temperature > 10) {
    DOM.body.style.backgroundColor = '#ffa018';
  } else if (temperature > -10) {
    DOM.body.style.backgroundColor = '#19b0ff';
  } else {
    DOM.body.style.backgroundColor = '#5b58c2';
  }
}
