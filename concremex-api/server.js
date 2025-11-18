import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post("/api/contaazul/orcamento", async (req, res) => {
  const accessToken = process.env.CONTA_AZUL_ACCESS_TOKEN;

  if (!accessToken) {
    return res
      .status(500)
      .json({ error: "Variavel de ambiente CONTA_AZUL_ACCESS_TOKEN nao definida" });
  }

  const {
    nome,
    empresa,
    cnpj,
    email,
    whatsapp,
    cidade,
    tipo_atendimento,
    perfil_cliente,
    escopo_comercial,
    numero_edital,
    prazo_entrega,
    mensagem,
  } = req.body || {};

  const customFields = [];
  const appendField = (name, value) => {
    if (value) {
      customFields.push({ name, value });
    }
  };

  appendField("tipo_atendimento", tipo_atendimento);
  appendField("perfil_cliente", perfil_cliente);
  appendField("escopo_comercial", escopo_comercial);
  appendField("numero_edital", numero_edital);
  appendField("prazo_entrega", prazo_entrega);

  const notes = [
    empresa ? `Empresa: ${empresa}` : null,
    cidade ? `Cidade: ${cidade}` : null,
    whatsapp ? `WhatsApp: ${whatsapp}` : null,
    mensagem ? `Mensagem: ${mensagem}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const contactPayload = {
    name: nome || "Lead Concremex",
    document: cnpj || undefined,
    emails: email ? [{ email, type: "BUSINESS" }] : undefined,
    phones: whatsapp ? [{ number: whatsapp, type: "MOBILE" }] : undefined,
    address: cidade ? { city: cidade } : undefined,
    custom_fields: customFields.length > 0 ? customFields : undefined,
    notes: notes || undefined,
  };

  try {
    const response = await fetch("https://api-v2.contaazul.com/crm/contacts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(contactPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Conta Azul API error:", response.status, errorText);
      return res
        .status(response.status)
        .json({ error: "Nao foi possivel enviar a solicitacao" });
    }

    res.json({ message: "Solicitacao enviada com sucesso" });
  } catch (error) {
    console.error("Erro ao enviar solicitacao:", error);
    res.status(500).json({ error: "Erro interno ao enviar solicitacao" });
  }
});

app.listen(PORT, () => {
  console.log(`API Concremex pronta em http://localhost:${PORT}`);
});
