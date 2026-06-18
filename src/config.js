/* ============================================================
   CONFIGURAÇÃO CENTRAL DO SITE
   ------------------------------------------------------------
   Edite tudo por aqui: nome, endereço, horários, redes sociais,
   estudos, ministérios, dados de doação, contato e YouTube.
   Os componentes apenas leem destes valores.
   ============================================================ */
import {
  Home as HomeIcon,
  Mail,
  BookOpen,
  Users,
  Heart,
  Play,
  Music,
  Baby,
  Camera,
  Megaphone,
  Flame,
  DoorOpen,
  Flower2,
  Sparkles,
  Swords,
} from "lucide-react";
import { IgIcon, FbIcon, YtIcon, WaIcon } from "./components/icons.jsx";

/* ------------------------------------------------------------
   IGREJA — nome, logo, fundo, versículo, endereço e horários
   ------------------------------------------------------------ */
export const CHURCH = {
  name: "Igreja Nova Vida de Botafogo",
  shortName: "Igreja Nova Vida de Botafogo",
  // Logo do topo (coloque o arquivo em public/, ex: /logo.png). Vazio = mostra o nome em texto.
  logo: "/logo.png",
  // Fundo. Use UM dos dois: vídeo (.mp4/.webm) OU imagem. Vazio = fundo de exemplo.
  backgroundVideo: "",
  backgroundImage: "fundo.png",
  verse: {
    text: "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.",
    ref: "Mateus 11:28",
  },
  founded: "2003",
  address: "Rua da Matriz, 95 - Botafogo, Rio de Janeiro - RJ",
  // O selo "PRÓXIMO" é calculado automaticamente pelo horário de Brasília.
  // Cada item é um DIA (agrupa vários eventos no mesmo card).
  // w = dia da semana (0=DOM, 1=SEG, 2=TER, 3=QUA, 4=QUI, 5=SEX, 6=SÁB).
  // times = horários em 24h (só para o cálculo; o que aparece na tela é o campo "time").
  schedule: [
    { day: "DOM", w: 0, events: [
      { title: "Escola Bíblica", time: "9h", times: ["09:00"] },
      { title: "Culto", time: "10h - 19h", times: ["10:00", "19:00"] },
      { title: "Classe Novos Convertidos e Juventude", time: "18h", times: ["18:00"] },
    ] },
    { day: "QUA", w: 3, events: [
      { title: "Culto", time: "19h30", times: ["19:30"] },
    ] },
    { day: "QUI", w: 4, events: [
      { title: "Culto de Oração", time: "7h15", times: ["07:15"] },
    ] },
  ],
};

/* ------------------------------------------------------------
   PROGRAMAÇÃO DO MÊS — agrupada por semana (editar a cada mês)
   Liste APENAS os eventos extras (fora os cultos fixos semanais).
   Cada evento: day = abreviação (DOM, SEG... SÁB), date "DD/MM",
   title, time e note (observação opcional, em dourado).
   ------------------------------------------------------------ */
export const MONTH_SCHEDULE = {
  label: "Junho de 2026",
  weeks: [
    {
      label: "Semana 1",
      range: "1 a 6 de junho",
      events: [
        { day: "SÁB", date: "06/06", title: "Consagração", time: "8h", note: "Obreiros / Planejamento Dia dos Pais" },
      ],
    },
    {
      label: "Semana 2",
      range: "7 a 13 de junho",
      events: [
        { day: "DOM", date: "07/06", title: "Ceia do Senhor / Início ensaio – Dia dos Pais", time: "10h - 19h" },
        { day: "SEX", date: "12/06", title: "Jantar dos Casados", time: "20h" },
      ],
    },
    {
      label: "Semana 3",
      range: "14 a 20 de junho",
      events: [],
    },
    {
      label: "Semana 4",
      range: "21 a 27 de junho",
      events: [
        { day: "DOM", date: "21/06", title: "Oração pela Família", time: "18h" },
        { day: "QUA", date: "24/06", title: "Noite de Adoração e Clamor", time: "18h", note: "Das 18h às 19h" },
        { day: "QUI", date: "25/06", title: "Culto de Oração", time: "", note: "Não haverá culto" },
        { day: "SEX", date: "26/06", title: "Culto das Mulheres", time: "19h30", note: "Segundo culto feminino" },
      ],
    },
    {
      label: "Semana 5",
      range: "28 a 30 de junho",
      events: [
        { day: "SEG", date: "29/06", title: "Encontro de Amigas", time: "19h", note: "Reunião mensal" },
        { day: "SEG", date: "29/06", title: "Encontro de Guerreiros", time: "19h", note: "Reunião mensal" },
      ],
    },
  ],
};

/* ------------------------------------------------------------
   REDES SOCIAIS e NAVEGAÇÃO
   ------------------------------------------------------------ */
export const SOCIALS = [
  { id: "ig", label: "Instagram", Icon: IgIcon, url: "https://www.instagram.com/igrejanvb/" },
  { id: "fb", label: "Facebook", Icon: FbIcon, url: "https://www.facebook.com/igrejanovavidadebotafogo" },
  { id: "yt", label: "YouTube", Icon: YtIcon, url: "https://www.youtube.com/channel/UCLuWhw8fYakYDzM9SlNXVKg" },
  { id: "wa", label: "WhatsApp", Icon: WaIcon, url: "https://wa.me/5521982982802" },
];

export const NAV = [
  { id: "inicio", label: "Início", Icon: HomeIcon },
  { id: "estudos", label: "Estudos", Icon: BookOpen },
  { id: "ministerios", label: "Ministérios", Icon: Users },
  { id: "doe", label: "Doe", Icon: Heart },
  { id: "cultos", label: "Cultos", Icon: Play },
  { id: "contato", label: "Contato", Icon: Mail },
];

/* ------------------------------------------------------------
   ESTUDOS — abas com cards de PDF, vídeo e imagem
   videoId = ID do vídeo do YouTube; pdf = link do arquivo.
   Os PDFs ficam em public/estudos/ (troque PDF_BASE se hospedar fora).
   ------------------------------------------------------------ */
export const PDF_BASE = "/estudos";

export const STUDIES = {
  intro:
    "Materiais das classes da Escola Bíblica Dominical e dos cursos de capacitação. Baixe os PDFs, assista às aulas e aprofunde sua fé.",
  current: "cristologia", // qual estudo abre por padrão (id da aba em andamento)
  tabs: [
    {
      id: "cristologia",
      label: "EBD Cristologia",
      items: [
        { type: "pdf", num: "Aula 01", title: "Cristologia", cover: "/estudos/capas/cristologia-1.webp", pdf: `${PDF_BASE}/CRISTOLOGIA_Aula1.pdf` },
        { type: "pdf", num: "Aula 02", title: "Jesus Cristo, Homem — A vida humana de Jesus", cover: "/estudos/capas/cristologia-2.webp", pdf: `${PDF_BASE}/CRISTOLOGIA_Aula2.pdf` },
        { type: "pdf", num: "Aula 03", title: "Jesus Cristo, Homem — As limitações de Jesus", cover: "/estudos/capas/cristologia-3.webp", pdf: `${PDF_BASE}/CRISTOLOGIA_Aula3.pdf` },
        { type: "pdf", num: "Aula 04", title: "Jesus Cristo, Deus — A evidência dos Evangelhos", cover: "/estudos/capas/cristologia-4.webp", pdf: `${PDF_BASE}/CRISTOLOGIA_Aula4.pdf` },
        { type: "pdf", num: "Aula 05", title: "Evidência de Cristo nos Evangelhos", cover: "/estudos/capas/cristologia-5.webp", pdf: `${PDF_BASE}/CRISTOLOGIA_Aula5.pdf` },
        { type: "pdf", num: "Aula 06", title: "Jesus Cristo, Deus — Testemunhos dos apóstolos", cover: "/estudos/capas/cristologia-6.webp", pdf: `${PDF_BASE}/CRISTOLOGIA_Aula6.pdf` },
        { type: "pdf", num: "Aula 07", title: "Jesus Cristo: a identificação de Jeová", cover: "/estudos/capas/cristologia-7.webp", pdf: `${PDF_BASE}/CRISTOLOGIA_Aula7.pdf` },
        { type: "pdf", num: "Aula 08", title: "Nomes e títulos de Cristo", cover: "/estudos/capas/cristologia-8.webp", pdf: `${PDF_BASE}/CRISTOLOGIA_Aula8.pdf` },
        { type: "pdf", num: "Aula 09", title: "A encarnação de Cristo", cover: "/estudos/capas/cristologia-9.webp", pdf: `${PDF_BASE}/CRISTOLOGIA_Aula9.pdf` },
        { type: "pdf", num: "Aula 10", title: "Os três ofícios de Cristo", cover: "/estudos/capas/cristologia-10.webp", pdf: `${PDF_BASE}/CRISTOLOGIA_Aula10.pdf` },
        { type: "pdf", num: "Aula 11", title: "O ensino no ministério de Cristo", cover: "/estudos/capas/cristologia-11.webp", pdf: `${PDF_BASE}/CRISTOLOGIA_Aula11.pdf` },
      ],
    },
    {
      id: "apocalipse",
      label: "EBD Apocalipse",
      items: [
        { type: "video", num: "Aula 01", title: "Escatologia — Parte 1", videoId: "W-9M-PvIs3I", cover: "/estudos/capas/apocalipse-1.webp", pdf: `${PDF_BASE}/APOCALIPSE_Aula1.pdf` },
        { type: "video", num: "Aula 02", title: "Escatologia — Parte 2", videoId: "UjytdzVytzI", cover: "/estudos/capas/apocalipse-2.webp", pdf: `${PDF_BASE}/APOCALIPSE_Aula2.pdf` },
        { type: "video", num: "Aula 03", title: "Escatologia — Parte 3", videoId: "NZ1r3sO4dfU", cover: "/estudos/capas/apocalipse-3.webp", pdf: `${PDF_BASE}/APOCALIPSE_Aula3.pdf` },
        { type: "video", num: "Aula 04", title: "Escatologia — Parte 4", videoId: "V_scgNPGmUM", cover: "/estudos/capas/apocalipse-4.webp", pdf: `${PDF_BASE}/APOCALIPSE_Aula4.pdf` },
        { type: "video", num: "Aula 05", title: "Escatologia — Parte 5", videoId: "Q1J2GK_81L0", cover: "/estudos/capas/apocalipse-5.webp", pdf: `${PDF_BASE}/APOCALIPSE_Aula5.pdf` },
        { type: "video", num: "Aula 06", title: "Capítulo 1", videoId: "foY5i2GJQHI", cover: "/estudos/capas/apocalipse-6.webp", pdf: `${PDF_BASE}/APOCALIPSE_Aula6.pdf` },
        { type: "video", num: "Aula 07", title: "Capítulos 2 e 3", videoId: "Ns_fhLRZfBc", cover: "/estudos/capas/apocalipse-7.webp", pdf: `${PDF_BASE}/APOCALIPSE_Aula7.pdf` },
        { type: "video", num: "Aula 08", title: "Capítulo 4", videoId: "S2v4D7edAZY", cover: "/estudos/capas/apocalipse-8.webp", pdf: `${PDF_BASE}/APOCALIPSE_Aula8.pdf` },
        { type: "video", num: "Aula 09", title: "Capítulos 5 e 6", videoId: "4BEZ3cBxAxs", cover: "/estudos/capas/apocalipse-9.webp", pdf: `${PDF_BASE}/APOCALIPSE_Aula9.pdf` },
        { type: "video", num: "Aula 10", title: "Capítulos 7 e 8", videoId: "yyNB9latoJA", cover: "/estudos/capas/apocalipse-10.webp", pdf: `${PDF_BASE}/APOCALIPSE_Aula10.pdf` },
        { type: "video", num: "Aula 11", title: "Capítulo 9", videoId: "B8nssUilmUw", cover: "/estudos/capas/apocalipse-11.webp", pdf: `${PDF_BASE}/APOCALIPSE_Aula11.pdf` },
        { type: "video", num: "Aula 12", title: "Capítulo 10", videoId: "1vcK5Iq01Xg", cover: "/estudos/capas/apocalipse-12.webp", pdf: `${PDF_BASE}/APOCALIPSE_Aula12.pdf` },
        { type: "video", num: "Aula 13", title: "Capítulo 11", videoId: "6ytzOZ6hxPo", cover: "/estudos/capas/apocalipse-13.webp", pdf: `${PDF_BASE}/APOCALIPSE_Aula13.pdf` },
        { type: "video", num: "Aula 14", title: "Capítulo 12", videoId: "8xSw2fvRmos", cover: "/estudos/capas/apocalipse-14.webp", pdf: `${PDF_BASE}/APOCALIPSE_Aula14.pdf` },
        { type: "video", num: "Aula 15", title: "Capítulo 13", videoId: "e2Hx7JHyCws", cover: "/estudos/capas/apocalipse-15.webp", pdf: `${PDF_BASE}/APOCALIPSE_Aula15.pdf` },
        { type: "video", num: "Aula 16", title: "Capítulo 14", videoId: "9nF4GHUhqc8", cover: "/estudos/capas/apocalipse-16.webp", pdf: `${PDF_BASE}/APOCALIPSE_Aula16.pdf` },
        { type: "video", num: "Aula 17", title: "Capítulos 15 e 16", videoId: "KKLdA2VGj6k", cover: "/estudos/capas/apocalipse-17.webp", pdf: `${PDF_BASE}/APOCALIPSE_Aula17.pdf` },
        { type: "video", num: "Aula 18", title: "Capítulos 17 e 18 (parte 1)", videoId: "Ix74fta9zYE", cover: "/estudos/capas/apocalipse-18.webp", pdf: `${PDF_BASE}/APOCALIPSE_Aula18.pdf` },
        { type: "video", num: "Aula 19", title: "Capítulos 18 (parte 2) e 19", videoId: "nTVSwWWeDws", cover: "/estudos/capas/apocalipse-19.webp", pdf: `${PDF_BASE}/APOCALIPSE_Aula19.pdf` },
        { type: "pdf", num: "Aula 20", title: "Capítulo 20", cover: "/estudos/capas/apocalipse-20.webp", pdf: `${PDF_BASE}/APOCALIPSE_Aula20.pdf` },
        { type: "video", num: "Aula 21", title: "Capítulos 21 e 22", videoId: "Ezp3lBmE7gM", cover: "/estudos/capas/apocalipse-21.webp", pdf: `${PDF_BASE}/APOCALIPSE_Aula21.pdf` },
      ],
    },
    {
      id: "espirito",
      label: "EBD Espírito Santo",
      items: [
        { type: "pdf", num: "Aula 01", title: "Quem é o Espírito Santo?", cover: "/estudos/capas/espirito-1.webp", pdf: `${PDF_BASE}/ESPIRITO_Aula1.pdf` },
        { type: "pdf", num: "Aula 02", title: "Os símbolos do Espírito Santo", cover: "/estudos/capas/espirito-2.webp", pdf: `${PDF_BASE}/ESPIRITO_Aula2.pdf` },
        { type: "pdf", num: "Aula 03", title: "O Espírito Santo e as Escrituras", cover: "/estudos/capas/espirito-3.webp", pdf: `${PDF_BASE}/ESPIRITO_Aula3.pdf` },
        { type: "pdf", num: "Aula 04", title: "Da criação até o nascimento de Jesus", cover: "/estudos/capas/espirito-4.webp", pdf: `${PDF_BASE}/ESPIRITO_Aula4.pdf` },
        { type: "pdf", num: "Aula 05", title: "Do nascimento de Jesus até Pentecostes", cover: "/estudos/capas/espirito-5.webp", pdf: `${PDF_BASE}/ESPIRITO_Aula5.pdf` },
        { type: "pdf", num: "Aula 06", title: "Depois de Pentecostes", cover: "/estudos/capas/espirito-6.webp", pdf: `${PDF_BASE}/ESPIRITO_Aula6.pdf` },
        { type: "pdf", num: "Aula 07", title: "O Espírito Santo na vida do crente", cover: "/estudos/capas/espirito-7.webp", pdf: `${PDF_BASE}/ESPIRITO_Aula7.pdf` },
        { type: "pdf", num: "Aula 08", title: "A luta interior do crente", cover: "/estudos/capas/espirito-8.webp", pdf: `${PDF_BASE}/ESPIRITO_Aula8.pdf` },
        { type: "pdf", num: "Aula 09", title: "O batismo com o Espírito Santo", cover: "/estudos/capas/espirito-9.webp", pdf: `${PDF_BASE}/ESPIRITO_Aula9.pdf` },
        { type: "pdf", num: "Aula 10", title: "Pecados contra o Espírito Santo", cover: "/estudos/capas/espirito-10.webp", pdf: `${PDF_BASE}/ESPIRITO_Aula10.pdf` },
        { type: "pdf", num: "Aula 11", title: "O fruto do Espírito", cover: "/estudos/capas/espirito-11.webp", pdf: `${PDF_BASE}/ESPIRITO_Aula11.pdf` },
        { type: "pdf", num: "Aula 12", title: "Princípios e objetivos dos dons", cover: "/estudos/capas/espirito-12.webp", pdf: `${PDF_BASE}/ESPIRITO_Aula12.pdf` },
        { type: "pdf", num: "Aula 13", title: "Os dons de ministério", cover: "/estudos/capas/espirito-13.webp", pdf: `${PDF_BASE}/ESPIRITO_Aula13.pdf` },
        { type: "pdf", num: "Aula 14", title: "Os dons de serviço", cover: "/estudos/capas/espirito-14.webp", pdf: `${PDF_BASE}/ESPIRITO_Aula14.pdf` },
        { type: "pdf", num: "Aula 15", title: "Os dons de sinais", cover: "/estudos/capas/espirito-15.webp", pdf: `${PDF_BASE}/ESPIRITO_Aula15.pdf` },
        { type: "pdf", num: "Aula 16", title: "Como reconhecer o seu dom", cover: "/estudos/capas/espirito-16.webp", pdf: `${PDF_BASE}/ESPIRITO_Aula16.pdf` },
        { type: "pdf", num: "Aula 17", title: "Como ficar cheio do Espírito Santo", cover: "/estudos/capas/espirito-17.webp", pdf: `${PDF_BASE}/ESPIRITO_Aula17.pdf` },
      ],
    },
    {
      id: "capacitacao",
      label: "Capacitação",
      items: [
        { type: "pdf", num: "Curso", title: "Capelania", cover: "/estudos/capas/capelania.webp", pdf: `${PDF_BASE}/CAPELANIA.pdf` },
        { type: "pdf", num: "Curso", title: "Evangelismo", cover: "/estudos/capas/evangelismo.webp", pdf: `${PDF_BASE}/EVANGELISMO.pdf` },
      ],
    },
  ],
};

/* ------------------------------------------------------------
   MINISTÉRIOS — 8 ministérios + Grupo de Guerreiros (bônus)
   Edite nomes de liderança, horários e textos.
   ------------------------------------------------------------ */
export const MINISTRIES = [
  {
    id: "comunicacoes", name: "Comunicações", Icon: Camera,
    image: "/min/comunicacoes.webp", // foto do ministério, ex: "/min/louvor.jpg" (vazio = fundo dourado)
    tagline: "Levando a mensagem além das quatro paredes.",
    leader: "Equipe de Mídia", meets: "Reuniões quinzenais",
    description: [
      "O Ministério de Comunicação tem como missão propagar a Palavra de Deus e as ações da igreja, por meio de mensagens, fotos e vídeos em nossas redes sociais. Também buscamos fortalecer a identidade visual da igreja e apoiar outros ministérios em suas necessidades de comunicação.",
    ],
    activities: [
      "Produção de material audiovisual para as redes sociais",
      "Atualização e manutenção do site da igreja",
      "Apoio na criação de conteúdo para eventos e apresentações internas e externas",
      "Operação e gerenciamento dos equipamentos de mídia utilizados nas transmissões dos eventos",
    ],
  },
  {
    id: "evangelismo", name: "Evangelismo e Integração", Icon: Megaphone,
    image: "/min/evangelismo.webp",
    tagline: "Anunciando o evangelho e integrando novos irmãos.",
    leader: "Ministério de Evangelismo", meets: "Sábados, 16h",
    description: [
      "O Ministério de Evangelismo tem como propósitos basilares proclamar o Evangelho de Cristo para despertar a fé nas pessoas, com o objetivo de levá-las a uma decisão de salvação, capacitar a igreja para cumprir a Grande Comissão e promover a integração dos novos convertidos ao corpo de Cristo.",
    ],
    activities: [
      "Desenvolver a capacitação pessoal para o evangelismo, com estudos direcionados para esse fim",
      "Preparar um programa de evangelização que ofereça a oportunidade de todos participarem, segundo os dons recebidos por Deus",
      "Promover evangelização em locais públicos (rua, hospitais e presídios) e nos lares",
      "Promover imediata integração dos novos convertidos ao seio da Igreja",
      "Estimular e apoiar projetos evangelísticos elaborados por outros ministérios da Igreja",
    ],
  },
  {
    id: "infantil", name: "Infantil", Icon: Baby,
    image: "/min/infantil.webp",
    tagline: "Ensinando os pequenos a amar a Jesus desde cedo.",
    leader: "Ministério Infantil", meets: "Domingos, durante o culto",
    description: [
      "Voltado à formação espiritual das crianças, o Ministério Infantil tem como missão apresentar a Palavra de Deus de maneira acessível, criativa e significativa. Seu propósito é ensinar os princípios cristãos, promover o discipulado desde a infância e oferecer suporte às famílias na caminhada com Cristo.",
    ],
    activities: [
      "Organização e realização de atividades lúdicas e didáticas",
      "Acolhimento e cuidado com as crianças durante os cultos e eventos da igreja",
      "Ensaios e apresentações com músicas, corais e jograis",
      "Ensino dos princípios cristãos por meio de histórias bíblicas",
      "Planejamento e organização de eventos especiais, como festas temáticas, gincanas e piqueniques",
    ],
  },
  {
    id: "intercessao", name: "Intercessão", Icon: Flame,
    image: "/min/intercessao.webp",
    tagline: "Sustentando a igreja em oração.",
    leader: "Ministério de Intercessão", meets: "Terças, 20h",
    description: [
      "Com um chamado voltado à oração, o Ministério de Intercessão tem como propósito clamar a Deus em favor do próximo, da igreja, dos líderes e dos ministérios. Busca ser um alicerce espiritual por meio da intercessão contínua, promovendo a unidade do corpo de Cristo, apoiando causas específicas e protegendo a igreja através da oração constante e vigilante.",
    ],
    activities: [
      "Interceder em oração pela igreja de forma geral",
      "Participar de cultos de oração e campanhas de jejum e oração por causas específicas",
      "Cobrir cultos, eventos, pastores e líderes de ministérios com oração",
      "Realizar visitas a membros da igreja e manter uma vida constante de oração",
    ],
  },
  {
    id: "recepcao", name: "Introdução e Recepção", Icon: DoorOpen,
    image: "/min/intro.webp",
    tagline: "O primeiro sorriso de quem chega.",
    leader: "Equipe de Recepção", meets: "Em todos os cultos",
    description: [
      "O Ministério de Introdução & Recepção tem como responsabilidade garantir que todos os que chegam à igreja sejam bem recebidos com cordialidade e cuidado. Além disso, oferece suporte nas atividades internas, colaborando para o bom andamento dos cultos e eventos.",
    ],
    activities: [
      "Auxiliar no bom funcionamento dos cultos e eventos da igreja",
      "Dar apoio aos pastores, membros e demais ministérios",
      "Servir com zelo na preparação da ceia, recepção e manutenção do templo",
    ],
  },
  {
    id: "juventude", name: "Juventude", Icon: Sparkles,
    image: "/min/juventude.webp",
    tagline: "Uma geração apaixonada por Jesus.",
    leader: "Ministério de Juventude", meets: "Sextas, 20h",
    description: [
      "O Ministério da Juventude tem como propósitos contribuir para o crescimento espiritual dos jovens e promover a comunhão dos mesmos.",
      "Os jovens serão incentivados a conhecer e aplicar os princípios bíblicos no dia a dia, a fim de construir uma base sólida para a caminhada cristã.",
    ],
    activities: [
      "Encontros semanais para estudo da Bíblia e oração",
      "Comunhão e integração dos jovens",
      "Discipulado e suporte espiritual para os jovens",
    ],
  },
  {
    id: "louvor", name: "Louvor", Icon: Music,
    image: "/min/louvor.webp",
    tagline: "Conduzindo a igreja à presença de Deus pela música.",
    leader: "Equipe de Louvor", meets: "Ensaios às quintas, 19h30",
    description: [
      "O Ministério de Louvor tem como missão conduzir a igreja à adoração a Deus com reverência, excelência e sensibilidade espiritual. Por meio da música, buscamos preparar os corações para receber a Palavra e promover um ambiente de comunhão com o Espírito Santo. Nosso foco não está na performance, mas no serviço ao altar — com dedicação, santidade e amor pela presença de Deus.",
    ],
    activities: [
      "Conduzir momentos de louvor e adoração durante os cultos e eventos da igreja",
      "Interceder espiritualmente por meio da música, promovendo cura, libertação e encorajamento",
      "Preparar espiritualmente o ambiente para a ministração da Palavra de Deus",
      "Promover unidade e sensibilidade ao mover do Espírito Santo em cada ministração",
    ],
  },
  {
    id: "mulheres", name: "Mulheres", Icon: Flower2,
    image: "/min/mulheres.webp",
    tagline: "Mulheres edificando mulheres na fé.",
    meta: [
      { label: "Cultos", value: "3ª sexta do mês, a cada 3 meses" },
      { label: "Encontros", value: "Toda última segunda-feira do mês" },
    ],
    description: [
      "O Ministério de Mulheres busca inspirar e fortalecer as mulheres da igreja, promovendo seu crescimento espiritual e incentivando o desenvolvimento de dons e talentos para servir ao Senhor com excelência.",
      "Oferecemos um espaço de comunhão e apoio, onde as mulheres podem se sentir acolhidas, criando laços de amizade e suporte emocional, porque unidas somos mais fortes.",
    ],
    activities: [
      "Encontros de amigas com testemunhos",
      "Discussão de assuntos relacionados à vida cristã e pessoal",
      "Fortalecimento dos laços entre as mulheres",
      "Auxílio para compreender o papel da mulher no lar, na igreja e na sociedade",
    ],
  },
  {
    id: "guerreiros", name: "Grupo de Guerreiros", Icon: Swords, bonus: true,
    image: "/min/guerreiros.webp",
    tagline: "O grupo de homens da igreja — irmãos que caminham juntos na fé.",
    meta: [
      { label: "Encontros", value: "Toda última segunda-feira do mês" },
    ],
    description: [
      "O Encontro dos Guerreiros busca promover o fortalecimento espiritual dos homens, capacitando-os a serem líderes inspiradores em suas famílias, na igreja e na sociedade.",
    ],
    activities: [
      "Incentivar cada homem a orar, estudar a Palavra e buscar a santificação",
      "Estimular amizades saudáveis e oferecer apoio emocional e espiritual entre os irmãos",
      "Criar um ambiente onde os homens possam compartilhar suas lutas, desafios e vitórias",
    ],
  },
];

/* ------------------------------------------------------------
   DOE — mensagem, versículo, PIX (com QR) e dados bancários
   ------------------------------------------------------------ */
export const DONATE = {
  message:
    "Suas ofertas e dízimos nos ajudam a continuar avançando na obra de Deus em nossa comunidade. Contribua com alegria e fé!",
  verse: {
    text: "Cada um contribua segundo propôs no seu coração, não com tristeza ou por necessidade; porque Deus ama ao que dá com alegria.",
    ref: "2 Coríntios 9:7",
  },
  pixKey: "04.800.134/0001-48",
  bank: [
    { k: "Banco", v: "BCO Santander (Brasil) S.A." },
    { k: "Agência", v: "1053" },
    { k: "Conta", v: "13000740-2" },
    { k: "Tipo", v: "Corrente" },
    { k: "Favorecido", v: "Igreja de Nova Vida" },
    { k: "CNPJ", v: "04.800.134/0001-48" },
  ],
};

/* ------------------------------------------------------------
   CONTATO — formulário via EmailJS
   Crie uma conta grátis em emailjs.com, conecte seu e-mail e cole
   os três códigos abaixo. O template deve usar as variáveis:
   {{from_name}}, {{reply_to}} e {{message}}.
   ------------------------------------------------------------ */
export const CONTACT = {
  email: "invbotafogo.contato@gmail.com",
  phone: "(21) 98298-2802",
  whatsapp: "https://wa.me/5521982982802",
  address: CHURCH.address,
  emailjs: { serviceId: "service_o1vil8b", templateId: "template_dkpvz6d", publicKey: "-2KW2spheV2m60q7x" },
};

/* ------------------------------------------------------------
   YOUTUBE
   Configure a chave da YouTube Data API e o ID do canal.
   Sem configuração (ou em caso de erro), mostra os exemplos de fallback.
   ------------------------------------------------------------ */
export const YOUTUBE = {
  // (Opcional) URL de um videos.json pronto. Vazio = usa a YouTube API direto (precisa de apiKey).
  videosUrl: "",
  apiKey: "AIzaSyAcUpzc7CbfbkjM7p2pD9WucHV5IzUvJr8", // restringir ao domínio após publicar
  channelId: "UCLuWhw8fYakYDzM9SlNXVKg", // canal da igreja (já preenchido)
  tag: "pregação",
  fallback: [
    { videoId: "", title: "Culto de Domingo — A graça que transforma", date: "" },
    { videoId: "", title: "Culto de Oração — Firmados na fé", date: "" },
    { videoId: "", title: "Culto de Jovens — Geração que adora", date: "" },
  ],
};
