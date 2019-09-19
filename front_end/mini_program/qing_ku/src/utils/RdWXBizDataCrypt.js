// 引入CryptoJS
import plugins_Crypto from "cryptojs";
var Crypto = plugins_Crypto.Crypto;

function RdWXBizDataCrypt(appid, session_key) {
  this.appid = appid;
  this.session_key = session_key;
}

RdWXBizDataCrypt.prototype.decryptData = function (encryptedData, iv) {
  // base64 decode ：使用 CryptoJS 中 Crypto.util.base64ToBytes()进行 base64解码
  var encryptedData = Crypto.util.base64ToBytes(encryptedData);
  var key = Crypto.util.base64ToBytes(this.session_key);
  var iv = Crypto.util.base64ToBytes(iv);

  // 对称解密使用的算法为 AES-128-CBC，数据采用PKCS#7填充
  var mode = new Crypto.mode.CBC(Crypto.pad.pkcs7);
  
  try {
    // 解密
    var bytes = Crypto.AES.decrypt(encryptedData, key, {
        asBpytes:true,
        iv: iv,
        mode: mode
    });
    
    var decryptResult = JSON.parse(bytes);
    
  } catch (err) {
    console.log(err)
  }

  if (decryptResult.watermark.appid !== this.appid) {
    console.log(err)
  }

  return decryptResult
}

export default RdWXBizDataCrypt;