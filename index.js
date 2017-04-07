var metawear = require('node-metawear');
var robot = require('robotjs');

function setupClicker() {
    metawear.discover((device) => {
        console.log('Discovered', device.id);
        console.log('Connecting...');

        device.on('disconnect', () => {
            console.log('disconnected from', device.id)
            setupClicker();
        });

        device.connectAndSetup((error) => {
            if (error) {
                console.error('Error connecting to device', error);
            } else {
                console.log('Connected');
            }

            var button = new device.Switch(device);
            button.register();

            button.onChange((pressed) => {
                if (pressed === 0) {
                    robot.keyTap('right');
                }
            });
        });
    });
}

setupClicker();