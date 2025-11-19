import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;
const TOKEN = process.env.CONTA_AZUL_ACCESS_TOKEN;

app.post("/api/contaazul/orcamento", async (req, res) => {
  try {
    const payload = req.body;

    const response = await fetch("https://api.contaazul.com/v1/sales", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const result = await response.json();

    if (!response.ok) {
      return res.status(400).json({
        erro: true,
        detalhes: result,
      });
    }

    res.json({
      sucesso: true,
      mensagem: "Integração concluída com sucesso!",
      retorno: result,
    });
  } catch (error) {
    res.status(500).json({
      erro: true,
      mensagem: "Falha na integração",
      detalhes: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.json({ status: "API Concremex rodando." });
});

app.listen(PORT, () => console.log(`API ativa na porta ${PORT}`));
