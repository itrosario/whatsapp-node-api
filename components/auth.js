const router = require("express").Router();
const fs = require("fs");

router.get("/checkauth", async (req, res) => {
  client
    .getState()
    .then((data) => {
      if(data){
        console.log('Data true:',data);
        res.send("<html><body><h2>Conectado</h2></body></html>");
      }else{
        console.log('Data False: ', data);
        sendQr(res, 'DESCONECTADO');
        //res.send(data);
      }
      
    })
    .catch((err) => {
      if (err) {
        res.send('DESCONECTADO');
      }
    });
});

router.get("/getqr", async (req, res) => {
  client
    .getState()
    .then((data) => {
      if (data) {
        res.write("<html><body><h2>Ya esta Logeado</h2></body></html>");
        res.end();
      } else sendQr(res, null);
    })
    .catch(() => sendQr(res, null));
});

function sendQr(res, estado) {
  fs.readFile("components/last.qr", (err, last_qr) => {
    if (!err && last_qr) {
      var page = `
                    <html>
                        <body>
                            ${estado === null? '':'<h1>DESCONECTADO</h1><br><h2>Scanear QR</h2>'}
                            <script type="module">
                            </script>
                            <div id="qrcode"></div>
                            <script type="module">
                                import QrCreator from "https://cdn.jsdelivr.net/npm/qr-creator/dist/qr-creator.es6.min.js";
                                let container = document.getElementById("qrcode");
                                QrCreator.render({
                                    text: "${last_qr}",
                                    radius: 0.5, // 0.0 to 0.5
                                    ecLevel: "H", // L, M, Q, H
                                    fill: "#536DFE", // foreground color
                                    background: null, // color or null for transparent
                                    size: 256, // in pixels
                                }, container);
                            </script>
                        </body>
                    </html>
                `;
      res.write(page);
      res.end();
    }
  });
}

module.exports = router;
