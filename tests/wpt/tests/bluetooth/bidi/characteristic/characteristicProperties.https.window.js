// META: script=/resources/testdriver.js?feature=bidi
// META: script=/resources/testdriver-vendor.js
// META: script=/bluetooth/resources/bluetooth-test.js
// META: script=/bluetooth/resources/bluetooth-fake-devices.js
// META: timeout=long
'use strict';
const test_desc = 'HeartRate device properties';

bluetooth_bidi_test(async () => {
  const {service} = await getHealthThermometerService()
  const [temperature_measurement, measurement_interval] = await Promise.all([
    service.getCharacteristic('temperature_measurement'),
    service.getCharacteristic('measurement_interval')
  ]);
  const tm_expected_properties = new TestCharacteristicProperties(['indicate']);
  assert_properties_equal(
      temperature_measurement.properties, tm_expected_properties);

  const mi_expected_properties =
      new TestCharacteristicProperties(['read', 'write', 'indicate']);
  assert_properties_equal(
      measurement_interval.properties, mi_expected_properties);
}, test_desc);
