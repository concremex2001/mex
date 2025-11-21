import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

app.post("/api/contaazul/orcamento", async (req, res) => {
  const dados = req.body || {};
  const smtpPort = Number(process.env.SMTP_PORT || 587);

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const corpoEmail = [
    "Novo orçamento recebido pelo site Concremex:",
    `Nome: ${dados.nome || ""}`,
    `E-mail: ${dados.email || ""}`,
    `Telefone: ${dados.telefone || ""}`,
    `Empresa: ${dados.empresa || ""}`,
    `Cidade: ${dados.cidade || ""}`,
    `Produto: ${dados.produto || ""}`,
    `Quantidade: ${dados.quantidade || ""}`,
    `Observações: ${dados.observacoes || ""}`,
    "",
    "Dados completos:",
    JSON.stringify(dados, null, 2),
  ].join("\n");

  try {
    await transporter.sendMail({
      from: `"Site Concremex" <${process.env.SMTP_USER}>`,
      to: process.env.ORCAMENTO_DESTINO,
      subject: "Novo orçamento recebido pelo site Concremex",
      text: corpoEmail,
    });

    return res.json({
      sucesso: true,
      mensagem: "Orçamento recebido e enviado por e-mail com sucesso.",
    });
  } catch (error) {
    return res.status(500).json({
      erro: true,
      mensagem: "Falha ao processar o orçamento.",
      detalhes: error.message,
    });
  }
});

app.get("/", (req, res) => {
  res.json({ status: "API Concremex rodando." });
});

app.listen(PORT, () => console.log(`API ativa na porta ${PORT}`));
