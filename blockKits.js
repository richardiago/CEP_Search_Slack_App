let homeTab_BlockKit = [
    {
      "type": "header",
      "text": {
        "type": "plain_text",
        "text": "Busca de Endereço",
        "emoji": true
      }
    },
    {
      "type": "divider"
    },
    {
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": "Esse aplicativo possibilita a busca de endereço a partir do Código de Endereçamento Postam (CEP).\n\nSão aceitos somente CEP's com oito digitos sem pontos ou traços.\n\nEsse aplicativo usa a api gratuita fornecida pelo site <https://viacep.com.br/|ViaCEP>"
      }
    }
  ];

let input_BlockKit = [
    {
        "type": "header",
        "block_id": "headerBlock",
        "text": {
            "type": "plain_text",
            "text": "🔍 Busca de Endereço",
            "emoji": true
        }
    },
    {
        "type": "divider",
        "block_id": "dividerBlock",
    },
    {
        "type": "section",
        "block_id": "sectionBlock",
        "text": {
            "type": "plain_text",
            "text": "Digite o CEP que deseja pesquisar:",
            "emoji": true
        }
    },
    {
        "type": "input",
        "block_id": "inputBlock",
        "element": {
            "type": "plain_text_input",
            "action_id": "inputCEP"
        },
        "label": {
            "type": "plain_text",
            "text": " ",
            "emoji": false
        }
    },
    {
        "type": "actions",
        "block_id": "submitBlock",
        "elements": [
            {
                "type": "button",
                "text": {
                    "type": "plain_text",
                    "text": "Buscar",
                    "emoji": true
                },
                "value": "submitCEPButton",
                "action_id": "submitCEPButton"
            }
        ]
    }
];

let erro_BlockKit = [
  {
			"type": "header",
			"block_id": "headerBlock",
			"text": {
				"type": "plain_text",
				"text": "🔍 Busca de Endereço - Resultado",
				"emoji": true
			}
		},
		{
			"type": "divider"
		},
		{
			"type": "section",
			"text": {
				"type": "plain_text",
				"text": "CEP não encontrado na base. Verifique o CEP digitado e tente novamente.",
				"emoji": true
			}
		}
];

function result_BlockKit (data) {
  
  return [
        {
          "type": "header",
          "block_id": "headerBlock",
          "text": {
            "type": "plain_text",
            "text": "🔍 Busca de Endereço - Resultado",
            "emoji": true
          }
        },
        {
          "type": "divider"
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Logradouro: * " + data.logradouro
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Complemento: * " + data.complemento
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Bairro: * " + data.bairro
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Cidade: * " + data.localidade
          }
        },
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": "*Estado: * " + data.uf
          }
        }
      ]
}

module.exports = {homeTab_BlockKit, result_BlockKit, input_BlockKit, erro_BlockKit};

