'use strict'

const knownDevices = [
  [0x0bda, 0x2832, 'Generic RTL2832U'],
  [0x0bda, 0x2838, 'Generic RTL2832U OEM'],
  [0x0413, 0x6680, 'DigitalNow Quad DVB-T PCI-E card'],
  [0x0413, 0x6f0f, 'Leadtek WinFast DTV Dongle mini D'],
  [0x0458, 0x707f, 'Genius TVGo DVB-T03 USB dongle (Ver. B)'],
  [0x0ccd, 0x00a9, 'Terratec Cinergy T Stick Black (rev 1)'],
  [0x0ccd, 0x00b3, 'Terratec NOXON DAB/DAB+ USB dongle (rev 1)'],
  [0x0ccd, 0x00b4, 'Terratec Deutschlandradio DAB Stick'],
  [0x0ccd, 0x00b5, 'Terratec NOXON DAB Stick - Radio Energy'],
  [0x0ccd, 0x00b7, 'Terratec Media Broadcast DAB Stick'],
  [0x0ccd, 0x00b8, 'Terratec BR DAB Stick'],
  [0x0ccd, 0x00b9, 'Terratec WDR DAB Stick'],
  [0x0ccd, 0x00c0, 'Terratec MuellerVerlag DAB Stick'],
  [0x0ccd, 0x00c6, 'Terratec Fraunhofer DAB Stick'],
  [0x0ccd, 0x00d3, 'Terratec Cinergy T Stick RC (Rev.3)'],
  [0x0ccd, 0x00d7, 'Terratec T Stick PLUS'],
  [0x0ccd, 0x00e0, 'Terratec NOXON DAB/DAB+ USB dongle (rev 2)'],
  [0x1554, 0x5020, 'PixelView PV-DT235U(RN)'],
  [0x15f4, 0x0131, 'Astrometa DVB-T/DVB-T2'],
  [0x15f4, 0x0133, 'HanfTek DAB+FM+DVB-T'],
  [0x185b, 0x0620, 'Compro Videomate U620F'],
  [0x185b, 0x0650, 'Compro Videomate U650F'],
  [0x185b, 0x0680, 'Compro Videomate U680F'],
  [0x1b80, 0xd393, 'GIGABYTE GT-U7300'],
  [0x1b80, 0xd394, 'DIKOM USB-DVBT HD'],
  [0x1b80, 0xd395, 'Peak 102569AGPK'],
  [0x1b80, 0xd397, 'KWorld KW-UB450-T USB DVB-T Pico TV'],
  [0x1b80, 0xd398, 'Zaapa ZT-MINDVBZP'],
  [0x1b80, 0xd39d, 'SVEON STV20 DVB-T USB & FM'],
  [0x1b80, 0xd3a4, 'Twintech UT-40'],
  [0x1b80, 0xd3a8, 'ASUS U3100MINI_PLUS_V2'],
  [0x1b80, 0xd3af, 'SVEON STV27 DVB-T USB & FM'],
  [0x1b80, 0xd3b0, 'SVEON STV21 DVB-T USB & FM'],
  [0x1d19, 0x1101, 'Dexatek DK DVB-T Dongle (Logilink VG0002A)'],
  [0x1d19, 0x1102, 'Dexatek DK DVB-T Dongle (MSI DigiVox mini II V3.0)'],
  [0x1d19, 0x1103, 'Dexatek Technology Ltd. DK 5217 DVB-T Dongle'],
  [0x1d19, 0x1104, 'MSI DigiVox Micro HD'],
  [0x1f4d, 0xa803, 'Sweex DVB-T USB'],
  [0x1f4d, 0xb803, 'GTek T803'],
  [0x1f4d, 0xc803, 'Lifeview LV5TDeluxe'],
  [0x1f4d, 0xd286, 'MyGica TD312'],
  [0x1f4d, 0xd803, 'PROlectrix DV107669']
]

document.addEventListener('DOMContentLoaded', function () {
  const button = document.getElementById('request-device')
  const result = document.getElementById('result')

  button.addEventListener('click', async () => {
    let device

    try {
      device = await navigator.usb.requestDevice({filters: []})
    } catch (err) {
      result.innerHTML = 'Error: ' + err.message
      return
    }

    if (device !== undefined) {
      console.log(device)
      let known = findKnownDevice(device)
      known = known
        ? `Device is compatible with librtlsdr (name: ${known}).`
        : `Device doesn't seem to be compatible with librtlsdr.`
      result.innerHTML = `
        <h2>Compatibility</h2>
        <p>${known}</p>
        <h2>Device Details</h2>
        <dl>
          <dt>Vendor ID:</dt>
          <dd>${device.vendorId}</dd>
          <dt>Product ID:</dt>
          <dd>${device.productId}</dd>
          <dt>Serial Number:</dt>
          <dd>${device.serialNumber}</dd>
          <dt>Manufacturer Name:</dt>
          <dd>${device.manufacturerName}</dd>
          <dt>Product Name:</dt>
          <dd>${device.productName}</dd>
        </dl>
      `
    }
  })
})

function findKnownDevice (device) {
  for (let i = 0; i < knownDevices.length; i++) {
    const known = knownDevices[i]
    if (known[0] === device.vendorId && known[1] === device.productId) return known[2]
  }
}
