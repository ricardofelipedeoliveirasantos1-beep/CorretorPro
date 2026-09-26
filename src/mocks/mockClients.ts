export interface Client {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: string;
  city: string;
  neighborhood: string;
  interestType: string;
  propertyInterest: string;
  budget: string;
  origin: string;
  responsible: string;
  createdAt: string;
  lastContact: string;
  observation: string;
  // Fallbacks for UI compatibility
  interest: string;
  negotiations: number;
}

export const mockClients: Client[] = [
  {
    id: 1, name: "Carlos Henrique Oliveira", phone: "(82) 9 0000-0001", email: "carlos.oliveira01@example.com",
    status: "Ativo", city: "Maceió", neighborhood: "Ponta Verde", interestType: "Compra", propertyInterest: "Apartamento 3 quartos",
    budget: "R$ 650.000", origin: "Instagram", responsible: "Mariana Costa", createdAt: "2026-09-02T09:42:00Z", lastContact: "2026-09-25",
    observation: "Procura imóvel próximo à praia e com duas vagas.", interest: "Apartamento 3 quartos", negotiations: 1
  },
  {
    id: 2, name: "Ana Paula Ferreira", phone: "(82) 9 0000-0002", email: "ana.ferreira02@example.com",
    status: "Em negociação", city: "Maceió", neighborhood: "Jatiúca", interestType: "Compra", propertyInterest: "Cobertura Duplex",
    budget: "R$ 1.250.000", origin: "Indicação", responsible: "Rafael Lima", createdAt: "2026-08-18T15:38:00Z", lastContact: "2026-09-26",
    observation: "Já realizou duas visitas e solicitou proposta.", interest: "Cobertura Duplex", negotiations: 1
  },
  {
    id: 3, name: "Bruno Almeida Santos", phone: "(82) 9 0000-0003", email: "bruno.santos03@example.com",
    status: "Ativo", city: "Maceió", neighborhood: "Farol", interestType: "Compra", propertyInterest: "Casa em condomínio",
    budget: "R$ 980.000", origin: "Site", responsible: "Mariana Costa", createdAt: "2026-09-10T12:23:00Z", lastContact: "2026-09-24",
    observation: "Família com dois filhos, prioridade para condomínio fechado.", interest: "Casa em condomínio", negotiations: 0
  },
  {
    id: 4, name: "Juliana Martins Rocha", phone: "(82) 9 0000-0004", email: "juliana.rocha04@example.com",
    status: "Com negócio fechado", city: "Maceió", neighborhood: "Ponta Verde", interestType: "Compra", propertyInterest: "Apartamento 2 quartos",
    budget: "R$ 520.000", origin: "Google", responsible: "Lucas Mendes", createdAt: "2026-07-09T10:01:00Z", lastContact: "2026-09-20",
    observation: "Compra concluída e documentação finalizada.", interest: "Apartamento 2 quartos", negotiations: 0
  },
  {
    id: 5, name: "Ricardo Gomes Lima", phone: "(82) 9 0000-0005", email: "ricardo.lima05@example.com",
    status: "Em negociação", city: "Maceió", neighborhood: "Cruz das Almas", interestType: "Compra", propertyInterest: "Apartamento novo",
    budget: "R$ 780.000", origin: "Facebook", responsible: "Rafael Lima", createdAt: "2026-08-27T14:49:00Z", lastContact: "2026-09-25",
    observation: "Aguardando aprovação da proposta.", interest: "Apartamento novo", negotiations: 2
  },
  {
    id: 6, name: "Fernanda Alves Costa", phone: "(82) 9 0000-0006", email: "fernanda.costa06@example.com",
    status: "Ativo", city: "Maceió", neighborhood: "Mangabeiras", interestType: "Aluguel", propertyInterest: "Apartamento mobiliado",
    budget: "R$ 4.500", origin: "Instagram", responsible: "Mariana Costa", createdAt: "2026-09-15T17:06:00Z", lastContact: "2026-09-26",
    observation: "Mudança prevista para o próximo mês.", interest: "Apartamento mobiliado", negotiations: 0
  },
  {
    id: 7, name: "Marcelo Vieira Nunes", phone: "(82) 9 0000-0007", email: "marcelo.nunes07@example.com",
    status: "Inativo", city: "Maceió", neighborhood: "Farol", interestType: "Compra", propertyInterest: "Apartamento 2 quartos",
    budget: "R$ 420.000", origin: "Site", responsible: "Lucas Mendes", createdAt: "2026-05-13T13:14:00Z", lastContact: "2026-07-02",
    observation: "Suspendeu procura por questões financeiras.", interest: "Apartamento 2 quartos", negotiations: 0
  },
  {
    id: 8, name: "Patrícia Moreira Silva", phone: "(82) 9 0000-0008", email: "patricia.silva08@example.com",
    status: "Em negociação", city: "Maceió", neighborhood: "Pajuçara", interestType: "Compra", propertyInterest: "Apartamento frente mar",
    budget: "R$ 1.480.000", origin: "Indicação", responsible: "Rafael Lima", createdAt: "2026-08-08T15:49:00Z", lastContact: "2026-09-26",
    observation: "Cliente solicitou revisão das condições de pagamento.", interest: "Apartamento frente mar", negotiations: 3
  },
  {
    id: 9, name: "Eduardo Barbosa Melo", phone: "(82) 9 0000-0009", email: "eduardo.melo09@example.com",
    status: "Ativo", city: "Maceió", neighborhood: "Antares", interestType: "Compra", propertyInterest: "Casa",
    budget: "R$ 620.000", origin: "Google", responsible: "Lucas Mendes", createdAt: "2026-09-17T18:34:00Z", lastContact: "2026-09-24",
    observation: "Busca casa com três quartos e área externa.", interest: "Casa", negotiations: 0
  },
  {
    id: 10, name: "Camila Rodrigues Lopes", phone: "(82) 9 0000-0010", email: "camila.lopes10@example.com",
    status: "Com negócio fechado", city: "Maceió", neighborhood: "Jatiúca", interestType: "Compra", propertyInterest: "Studio",
    budget: "R$ 390.000", origin: "Instagram", responsible: "Mariana Costa", createdAt: "2026-06-20T14:45:00Z", lastContact: "2026-09-18",
    observation: "Compra concluída para investimento.", interest: "Studio", negotiations: 0
  },
  {
    id: 11, name: "André Luiz Carvalho", phone: "(82) 9 0000-0011", email: "andre.carvalho11@example.com",
    status: "Ativo", city: "Recife", neighborhood: "Boa Viagem", interestType: "Investimento", propertyInterest: "Apartamento compacto",
    budget: "R$ 580.000", origin: "Site", responsible: "Rafael Lima", createdAt: "2026-09-05T11:25:00Z", lastContact: "2026-09-23",
    observation: "Procura imóvel com bom potencial de locação.", interest: "Apartamento compacto", negotiations: 0
  },
  {
    id: 12, name: "Vanessa Ribeiro Souza", phone: "(82) 9 0000-0012", email: "vanessa.souza12@example.com",
    status: "Em negociação", city: "Maceió", neighborhood: "Ponta Verde", interestType: "Compra", propertyInterest: "Apartamento alto padrão",
    budget: "R$ 1.100.000", origin: "Indicação", responsible: "Mariana Costa", createdAt: "2026-08-14T09:40:00Z", lastContact: "2026-09-25",
    observation: "Em negociação de valor e mobília.", interest: "Apartamento alto padrão", negotiations: 2
  },
  {
    id: 13, name: "Gustavo Pereira Freitas", phone: "(82) 9 0000-0013", email: "gustavo.freitas13@example.com",
    status: "Inativo", city: "Maceió", neighborhood: "Serraria", interestType: "Compra", propertyInterest: "Casa em condomínio",
    budget: "R$ 750.000", origin: "Facebook", responsible: "Lucas Mendes", createdAt: "2026-04-22T12:31:00Z", lastContact: "2026-07-15",
    observation: "Não respondeu aos últimos contatos.", interest: "Casa em condomínio", negotiations: 0
  },
  {
    id: 14, name: "Daniela Araújo Campos", phone: "(82) 9 0000-0014", email: "daniela.campos14@example.com",
    status: "Ativo", city: "Maceió", neighborhood: "Gruta de Lourdes", interestType: "Compra", propertyInterest: "Apartamento 3 quartos",
    budget: "R$ 690.000", origin: "Google", responsible: "Rafael Lima", createdAt: "2026-09-12T13:30:00Z", lastContact: "2026-09-25",
    observation: "Prefere prédio com área de lazer completa.", interest: "Apartamento 3 quartos", negotiations: 1
  },
  {
    id: 15, name: "Felipe Monteiro Costa", phone: "(82) 9 0000-0015", email: "felipe.costa15@example.com",
    status: "Com negócio fechado", city: "Maceió", neighborhood: "Cruz das Almas", interestType: "Compra", propertyInterest: "Apartamento novo",
    budget: "R$ 835.000", origin: "Site", responsible: "Mariana Costa", createdAt: "2026-06-03T11:14:00Z", lastContact: "2026-09-16",
    observation: "Contrato assinado e venda concluída.", interest: "Apartamento novo", negotiations: 0
  },
  {
    id: 16, name: "Larissa Gomes Duarte", phone: "(82) 9 0000-0016", email: "larissa.duarte16@example.com",
    status: "Em negociação", city: "Maceió", neighborhood: "Jatiúca", interestType: "Compra", propertyInterest: "Cobertura",
    budget: "R$ 1.350.000", origin: "Instagram", responsible: "Lucas Mendes", createdAt: "2026-08-30T13:27:00Z", lastContact: "2026-09-26",
    observation: "Visita realizada e proposta em preparação.", interest: "Cobertura", negotiations: 1
  },
  {
    id: 17, name: "Roberto Nascimento Lima", phone: "(82) 9 0000-0017", email: "roberto.lima17@example.com",
    status: "Ativo", city: "Maceió", neighborhood: "Pajuçara", interestType: "Aluguel", propertyInterest: "Apartamento 2 quartos",
    budget: "R$ 3.200", origin: "Site", responsible: "Rafael Lima", createdAt: "2026-09-20T08:14:00Z", lastContact: "2026-09-25",
    observation: "Precisa de imóvel mobiliado.", interest: "Apartamento 2 quartos", negotiations: 0
  },
  {
    id: 18, name: "Beatriz Castro Moura", phone: "(82) 9 0000-0018", email: "beatriz.moura18@example.com",
    status: "Com negócio fechado", city: "Maceió", neighborhood: "Mangabeiras", interestType: "Compra", propertyInterest: "Apartamento",
    budget: "R$ 610.000", origin: "Indicação", responsible: "Mariana Costa", createdAt: "2026-05-22T10:01:00Z", lastContact: "2026-09-10",
    observation: "Negócio finalizado com financiamento.", interest: "Apartamento", negotiations: 0
  },
  {
    id: 19, name: "Thiago Ramos Barbosa", phone: "(82) 9 0000-0019", email: "thiago.barbosa19@example.com",
    status: "Inativo", city: "Maceió", neighborhood: "Tabuleiro", interestType: "Compra", propertyInterest: "Casa",
    budget: "R$ 450.000", origin: "Facebook", responsible: "Lucas Mendes", createdAt: "2026-03-18T11:03:00Z", lastContact: "2026-06-30",
    observation: "Cliente adiou compra para 2027.", interest: "Casa", negotiations: 0
  },
  {
    id: 20, name: "Renata Correia Alves", phone: "(82) 9 0000-0020", email: "renata.alves20@example.com",
    status: "Em negociação", city: "Maceió", neighborhood: "Ponta Verde", interestType: "Investimento", propertyInterest: "Studio",
    budget: "R$ 430.000", origin: "Instagram", responsible: "Rafael Lima", createdAt: "2026-08-25T09:59:00Z", lastContact: "2026-09-26",
    observation: "Negociando duas unidades para investimento.", interest: "Studio", negotiations: 2
  },
  {
    id: 21, name: "João Pedro Martins", phone: "(82) 9 0000-0021", email: "joao.martins21@example.com",
    status: "Ativo", city: "Maceió", neighborhood: "Farol", interestType: "Compra", propertyInterest: "Apartamento 2 quartos",
    budget: "R$ 500.000", origin: "Google", responsible: "Mariana Costa", createdAt: "2026-09-18T09:06:00Z", lastContact: "2026-09-25",
    observation: "Primeira compra de imóvel.", interest: "Apartamento 2 quartos", negotiations: 0
  },
  {
    id: 22, name: "Mariana Lopes Ferreira", phone: "(82) 9 0000-0022", email: "mariana.ferreira22@example.com",
    status: "Em negociação", city: "Maceió", neighborhood: "Guaxuma", interestType: "Compra", propertyInterest: "Casa em condomínio",
    budget: "R$ 1.450.000", origin: "Indicação", responsible: "Lucas Mendes", createdAt: "2026-08-07T14:33:00Z", lastContact: "2026-09-24",
    observation: "Analisando documentação do imóvel.", interest: "Casa em condomínio", negotiations: 1
  },
  {
    id: 23, name: "Sérgio Augusto Pinto", phone: "(82) 9 0000-0023", email: "sergio.pinto23@example.com",
    status: "Com negócio fechado", city: "Maceió", neighborhood: "Ponta Verde", interestType: "Compra", propertyInterest: "Apartamento 3 quartos",
    budget: "R$ 720.000", origin: "Site", responsible: "Rafael Lima", createdAt: "2026-05-01T16:58:00Z", lastContact: "2026-09-08",
    observation: "Venda finalizada à vista.", interest: "Apartamento 3 quartos", negotiations: 0
  },
  {
    id: 24, name: "Aline Vasconcelos Rocha", phone: "(82) 9 0000-0024", email: "aline.rocha24@example.com",
    status: "Inativo", city: "Maceió", neighborhood: "Jatiúca", interestType: "Aluguel", propertyInterest: "Apartamento mobiliado",
    budget: "R$ 3.800", origin: "Instagram", responsible: "Mariana Costa", createdAt: "2026-04-11T08:37:00Z", lastContact: "2026-06-12",
    observation: "Encontrou imóvel por outro canal.", interest: "Apartamento mobiliado", negotiations: 0
  },
  {
    id: 25, name: "Diego Fernandes Melo", phone: "(82) 9 0000-0025", email: "diego.melo25@example.com",
    status: "Ativo", city: "Maceió", neighborhood: "Cruz das Almas", interestType: "Compra", propertyInterest: "Apartamento lançamento",
    budget: "R$ 840.000", origin: "Evento", responsible: "Lucas Mendes", createdAt: "2026-09-03T16:08:00Z", lastContact: "2026-09-25",
    observation: "Interessado em condições de lançamento.", interest: "Apartamento lançamento", negotiations: 1
  },
  {
    id: 26, name: "Priscila Mendes Silva", phone: "(82) 9 0000-0026", email: "priscila.silva26@example.com",
    status: "Em negociação", city: "Maceió", neighborhood: "Jatiúca", interestType: "Compra", propertyInterest: "Apartamento 4 quartos",
    budget: "R$ 1.180.000", origin: "Indicação", responsible: "Rafael Lima", createdAt: "2026-08-03T14:01:00Z", lastContact: "2026-09-26",
    observation: "Família negociando prazo de entrada.", interest: "Apartamento 4 quartos", negotiations: 1
  },
  {
    id: 27, name: "Leonardo Farias Costa", phone: "(82) 9 0000-0027", email: "leonardo.costa27@example.com",
    status: "Ativo", city: "Maceió", neighborhood: "Pajuçara", interestType: "Investimento", propertyInterest: "Studio",
    budget: "R$ 410.000", origin: "Google", responsible: "Mariana Costa", createdAt: "2026-09-11T14:39:00Z", lastContact: "2026-09-24",
    observation: "Busca retorno com aluguel por temporada.", interest: "Studio", negotiations: 0
  },
  {
    id: 28, name: "Simone Albuquerque Reis", phone: "(82) 9 0000-0028", email: "simone.reis28@example.com",
    status: "Com negócio fechado", city: "Maceió", neighborhood: "Farol", interestType: "Compra", propertyInterest: "Apartamento",
    budget: "R$ 560.000", origin: "Site", responsible: "Lucas Mendes", createdAt: "2026-05-19T15:02:00Z", lastContact: "2026-09-05",
    observation: "Financiamento aprovado e contrato assinado.", interest: "Apartamento", negotiations: 0
  },
  {
    id: 29, name: "Alexandre Tavares Lima", phone: "(82) 9 0000-0029", email: "alexandre.lima29@example.com",
    status: "Inativo", city: "Maceió", neighborhood: "Ponta Verde", interestType: "Compra", propertyInterest: "Cobertura",
    budget: "R$ 1.700.000", origin: "Instagram", responsible: "Rafael Lima", createdAt: "2026-03-08T09:57:00Z", lastContact: "2026-05-21",
    observation: "Cliente desistiu temporariamente do investimento.", interest: "Cobertura", negotiations: 0
  },
  {
    id: 30, name: "Natália Cavalcante Melo", phone: "(82) 9 0000-0030", email: "natalia.melo30@example.com",
    status: "Em negociação", city: "Maceió", neighborhood: "Mangabeiras", interestType: "Compra", propertyInterest: "Apartamento novo",
    budget: "R$ 670.000", origin: "Facebook", responsible: "Mariana Costa", createdAt: "2026-08-21T16:32:00Z", lastContact: "2026-09-26",
    observation: "Proposta enviada ao proprietário.", interest: "Apartamento novo", negotiations: 1
  },
  {
    id: 31, name: "Rafael Moreira Campos", phone: "(82) 9 0000-0031", email: "rafael.campos31@example.com",
    status: "Ativo", city: "Maceió", neighborhood: "Serraria", interestType: "Compra", propertyInterest: "Casa",
    budget: "R$ 730.000", origin: "Site", responsible: "Lucas Mendes", createdAt: "2026-09-08T13:28:00Z", lastContact: "2026-09-22",
    observation: "Procura garagem para três veículos.", interest: "Casa", negotiations: 0
  },
  {
    id: 32, name: "Isabela Nunes Andrade", phone: "(82) 9 0000-0032", email: "isabela.andrade32@example.com",
    status: "Com negócio fechado", city: "Maceió", neighborhood: "Jatiúca", interestType: "Compra", propertyInterest: "Apartamento 2 quartos",
    budget: "R$ 590.000", origin: "Indicação", responsible: "Rafael Lima", createdAt: "2026-06-18T12:29:00Z", lastContact: "2026-09-02",
    observation: "Venda concluída após segunda visita.", interest: "Apartamento 2 quartos", negotiations: 0
  },
  {
    id: 33, name: "Paulo Henrique Braga", phone: "(82) 9 0000-0033", email: "paulo.braga33@example.com",
    status: "Inativo", city: "Maceió", neighborhood: "Benedito Bentes", interestType: "Compra", propertyInterest: "Casa",
    budget: "R$ 350.000", origin: "Facebook", responsible: "Mariana Costa", createdAt: "2026-04-05T08:06:00Z", lastContact: "2026-06-20",
    observation: "Não possui crédito aprovado neste momento.", interest: "Casa", negotiations: 0
  },
  {
    id: 34, name: "Cristina Moura Lopes", phone: "(82) 9 0000-0034", email: "cristina.lopes34@example.com",
    status: "Em negociação", city: "Maceió", neighborhood: "Ponta Verde", interestType: "Compra", propertyInterest: "Apartamento alto padrão",
    budget: "R$ 1.320.000", origin: "Site", responsible: "Lucas Mendes", createdAt: "2026-08-16T13:31:00Z", lastContact: "2026-09-25",
    observation: "Avaliando proposta final.", interest: "Apartamento alto padrão", negotiations: 1
  },
  {
    id: 35, name: "Vinícius Araújo Santos", phone: "(82) 9 0000-0035", email: "vinicius.santos35@example.com",
    status: "Ativo", city: "Maceió", neighborhood: "Cruz das Almas", interestType: "Investimento", propertyInterest: "Apartamento compacto",
    budget: "R$ 510.000", origin: "Instagram", responsible: "Rafael Lima", createdAt: "2026-09-09T11:45:00Z", lastContact: "2026-09-23",
    observation: "Busca unidade próxima a shopping e universidade.", interest: "Apartamento compacto", negotiations: 0
  },
  {
    id: 36, name: "Luciana Peixoto Freire", phone: "(82) 9 0000-0036", email: "luciana.freire36@example.com",
    status: "Em negociação", city: "Maceió", neighborhood: "Guaxuma", interestType: "Compra", propertyInterest: "Casa de condomínio",
    budget: "R$ 1.600.000", origin: "Indicação", responsible: "Mariana Costa", createdAt: "2026-08-10T10:06:00Z", lastContact: "2026-09-26",
    observation: "Documentação em análise.", interest: "Casa de condomínio", negotiations: 1
  },
  {
    id: 37, name: "Mateus Correia Lima", phone: "(82) 9 0000-0037", email: "mateus.lima37@example.com",
    status: "Ativo", city: "Maceió", neighborhood: "Farol", interestType: "Aluguel", propertyInterest: "Apartamento",
    budget: "R$ 2.900", origin: "Google", responsible: "Lucas Mendes", createdAt: "2026-09-22T13:40:00Z", lastContact: "2026-09-26",
    observation: "Precisa mudar em até quinze dias.", interest: "Apartamento", negotiations: 0
  },
  {
    id: 38, name: "Raquel Albuquerque Silva", phone: "(82) 9 0000-0038", email: "raquel.silva38@example.com",
    status: "Com negócio fechado", city: "Maceió", neighborhood: "Pajuçara", interestType: "Compra", propertyInterest: "Apartamento frente mar",
    budget: "R$ 950.000", origin: "Instagram", responsible: "Rafael Lima", createdAt: "2026-06-09T11:20:00Z", lastContact: "2026-08-28",
    observation: "Escritura concluída.", interest: "Apartamento frente mar", negotiations: 0
  },
  {
    id: 39, name: "Henrique Dias Melo", phone: "(82) 9 0000-0039", email: "henrique.melo39@example.com",
    status: "Inativo", city: "Maceió", neighborhood: "Jatiúca", interestType: "Investimento", propertyInterest: "Studio",
    budget: "R$ 380.000", origin: "Evento", responsible: "Mariana Costa", createdAt: "2026-03-28T11:37:00Z", lastContact: "2026-06-09",
    observation: "Investimento adiado.", interest: "Studio", negotiations: 0
  },
  {
    id: 40, name: "Débora Martins Costa", phone: "(82) 9 0000-0040", email: "debora.costa40@example.com",
    status: "Em negociação", city: "Maceió", neighborhood: "Ponta Verde", interestType: "Compra", propertyInterest: "Apartamento 3 quartos",
    budget: "R$ 880.000", origin: "Indicação", responsible: "Lucas Mendes", createdAt: "2026-08-19T08:16:00Z", lastContact: "2026-09-25",
    observation: "Negociação na etapa de documentação.", interest: "Apartamento 3 quartos", negotiations: 1
  },
  {
    id: 41, name: "Murilo Gonçalves Reis", phone: "(82) 9 0000-0041", email: "murilo.reis41@example.com",
    status: "Ativo", city: "Maceió", neighborhood: "Mangabeiras", interestType: "Compra", propertyInterest: "Apartamento novo",
    budget: "R$ 640.000", origin: "Site", responsible: "Rafael Lima", createdAt: "2026-09-13T16:40:00Z", lastContact: "2026-09-24",
    observation: "Quer visitar duas opções no final de semana.", interest: "Apartamento novo", negotiations: 1
  },
  {
    id: 42, name: "Tatiane Oliveira Ramos", phone: "(82) 9 0000-0042", email: "tatiane.ramos42@example.com",
    status: "Com negócio fechado", city: "Maceió", neighborhood: "Farol", interestType: "Compra", propertyInterest: "Apartamento",
    budget: "R$ 540.000", origin: "Google", responsible: "Mariana Costa", createdAt: "2026-05-30T14:44:00Z", lastContact: "2026-08-20",
    observation: "Contrato e financiamento concluídos.", interest: "Apartamento", negotiations: 0
  },
  {
    id: 43, name: "Fábio Menezes Rocha", phone: "(82) 9 0000-0043", email: "fabio.rocha43@example.com",
    status: "Inativo", city: "Maceió", neighborhood: "Antares", interestType: "Compra", propertyInterest: "Casa",
    budget: "R$ 580.000", origin: "Facebook", responsible: "Lucas Mendes", createdAt: "2026-04-16T18:32:00Z", lastContact: "2026-06-01",
    observation: "Cliente não respondeu às tentativas de contato.", interest: "Casa", negotiations: 0
  },
  {
    id: 44, name: "Gabriela Nascimento Alves", phone: "(82) 9 0000-0044", email: "gabriela.alves44@example.com",
    status: "Em negociação", city: "Maceió", neighborhood: "Jatiúca", interestType: "Compra", propertyInterest: "Apartamento",
    budget: "R$ 760.000", origin: "Instagram", responsible: "Rafael Lima", createdAt: "2026-08-24T10:47:00Z", lastContact: "2026-09-26",
    observation: "Proprietário avaliando contraproposta.", interest: "Apartamento", negotiations: 2
  },
  {
    id: 45, name: "Leandro Moura Campos", phone: "(82) 9 0000-0045", email: "leandro.campos45@example.com",
    status: "Ativo", city: "Maceió", neighborhood: "Ponta Verde", interestType: "Aluguel", propertyInterest: "Apartamento mobiliado",
    budget: "R$ 5.000,00", origin: "Site", responsible: "Mariana Costa", createdAt: "2026-09-21T08:01:00Z", lastContact: "2026-09-25",
    observation: "Executivo buscando contrato de 12 meses.", interest: "Apartamento mobiliado", negotiations: 0
  },
  {
    id: 46, name: "Michele Freitas Lima", phone: "(82) 9 0000-0046", email: "michele.lima46@example.com",
    status: "Com negócio fechado", city: "Maceió", neighborhood: "Cruz das Almas", interestType: "Compra", propertyInterest: "Apartamento",
    budget: "R$ 810.000", origin: "Indicação", responsible: "Lucas Mendes", createdAt: "2026-06-12T12:01:00Z", lastContact: "2026-08-17",
    observation: "Compra finalizada com financiamento bancário.", interest: "Apartamento", negotiations: 0
  },
  {
    id: 47, name: "Rodrigo Barros Duarte", phone: "(82) 9 0000-0047", email: "rodrigo.duarte47@example.com",
    status: "Inativo", city: "Maceió", neighborhood: "Serraria", interestType: "Compra", propertyInterest: "Casa em condomínio",
    budget: "R$ 920.000", origin: "Google", responsible: "Rafael Lima", createdAt: "2026-03-14T18:27:00Z", lastContact: "2026-05-30",
    observation: "Busca suspensa por mudança profissional.", interest: "Casa em condomínio", negotiations: 0
  },
  {
    id: 48, name: "Flávia Correia Mendes", phone: "(82) 9 0000-0048", email: "flavia.mendes48@example.com",
    status: "Em negociação", city: "Maceió", neighborhood: "Pajuçara", interestType: "Compra", propertyInterest: "Apartamento frente mar",
    budget: "R$ 1.080.000", origin: "Instagram", responsible: "Mariana Costa", createdAt: "2026-08-12T15:06:00Z", lastContact: "2026-09-26",
    observation: "Aguardando retorno sobre proposta.", interest: "Apartamento frente mar", negotiations: 1
  },
  {
    id: 49, name: "César Augusto Fonseca", phone: "(82) 9 0000-0049", email: "cesar.fonseca49@example.com",
    status: "Ativo", city: "Maceió", neighborhood: "Jatiúca", interestType: "Investimento", propertyInterest: "Studio",
    budget: "R$ 460.000", origin: "Evento", responsible: "Lucas Mendes", createdAt: "2026-09-14T17:32:00Z", lastContact: "2026-09-24",
    observation: "Analisa imóvel para locação por temporada.", interest: "Studio", negotiations: 0
  },
  {
    id: 50, name: "Amanda Ribeiro Costa", phone: "(82) 9 0000-0050", email: "amanda.costa50@example.com",
    status: "Com negócio fechado", city: "Maceió", neighborhood: "Ponta Verde", interestType: "Compra", propertyInterest: "Apartamento 3 quartos",
    budget: "R$ 890.000", origin: "Indicação", responsible: "Rafael Lima", createdAt: "2026-05-25T09:40:00Z", lastContact: "2026-08-12",
    observation: "Processo concluído e imóvel entregue.", interest: "Apartamento 3 quartos", negotiations: 0
  }
];
