// pages/api/faucet.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { address } = req.body;
  if (!address) {
    return res.status(400).json({ success: false, message: 'Alamat diperlukan' });
  }

  try {
    // Validasi alamat sesuai format Zenchain testnet
    if (!isValidZenchainAddress(address)) {
      return res.status(400).json({ success: false, message: 'Alamat tidak valid' });
    }

    // Logic pengiriman faucet — contoh pseudocode:
    // const txHash = await sendZTCToAddress(address);

    // Untuk contoh, kita simulasi sukses:
    const txHash = '0xDEADBEEF1234567890'; 

    return res.status(200).json({
      success: true,
      message: `ZTC berhasil dikirim! TxHash: ${txHash}`
    });
  } catch (err) {
    console.error('Error faucet:', err);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

// Fungsi validasi alamat (dummy — ubah sesuai aturan Zenchain)
function isValidZenchainAddress(addr) {
  // Contoh: mulai dengan "ztc" atau format tertentu
  return typeof addr === 'string' && addr.length > 10;
}

// Fungsi pengiriman ZTC (dummy stub, harus diganti dengan implementasi blockchain nyata)
/*
async function sendZTCToAddress(address) {
  // Implementasi panggilan ke node Zenchain testnet, wallet, signer, dsb.
  // Contoh (pseudocode):
  // const provider = new ZenchainProvider(NETWORK_URL);
  // const signer = provider.getFaucetSigner(PRIVATE_KEY);
  // const tx = await signer.sendTransaction({ to: address, value: AMOUNT });
  // await tx.wait();
  // return tx.hash;
}
*/
