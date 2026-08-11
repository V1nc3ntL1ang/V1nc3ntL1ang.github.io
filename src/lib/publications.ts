export type Publication = {
  id: string;
  title: string;
  authors: string;
  venue: string;
  venueShort: string;
  year: number;
  distinction?: string;
  paperUrl: string;
  codeUrl: string;
  projectUrl?: string;
};

export const publicationsVisible =
  process.env.NEXT_PUBLIC_SHOW_PUBLICATIONS === "true";

export const publications: Publication[] = [
  {
    id: "attention-is-all-you-need",
    title: "Attention Is All You Need",
    authors:
      "Ashish Vaswani, Noam Shazeer, Niki Parmar, Jakob Uszkoreit, Llion Jones, Aidan N. Gomez, Łukasz Kaiser, and Illia Polosukhin",
    venue:
      "Advances in Neural Information Processing Systems 30 (NeurIPS), pp. 5998–6008, 2017.",
    venueShort: "NeurIPS",
    year: 2017,
    distinction: "Poster",
    paperUrl:
      "https://papers.nips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf",
    codeUrl: "https://github.com/tensorflow/tensor2tensor",
  },
  {
    id: "bert",
    title:
      "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding",
    authors: "Jacob Devlin, Ming-Wei Chang, Kenton Lee, and Kristina Toutanova",
    venue:
      "Conference of the North American Chapter of the Association for Computational Linguistics: Human Language Technologies (NAACL-HLT), pp. 4171–4186, 2019.",
    venueShort: "NAACL",
    year: 2019,
    distinction: "Best Long Paper",
    paperUrl: "https://aclanthology.org/N19-1423.pdf",
    codeUrl: "https://github.com/google-research/bert",
  },
  {
    id: "clip",
    title: "Learning Transferable Visual Models From Natural Language Supervision",
    authors: "Alec Radford, Jong Wook Kim, Chris Hallacy, et al.",
    venue:
      "Proceedings of the 38th International Conference on Machine Learning (ICML), pp. 8748–8763, 2021.",
    venueShort: "ICML",
    year: 2021,
    distinction: "Poster",
    paperUrl:
      "https://proceedings.mlr.press/v139/radford21a/radford21a.pdf",
    codeUrl: "https://github.com/openai/CLIP",
  },
  {
    id: "segment-anything",
    title: "Segment Anything",
    authors: "Alexander Kirillov, Eric Mintun, Nikhila Ravi, et al.",
    venue:
      "IEEE/CVF International Conference on Computer Vision (ICCV), pp. 4015–4026, 2023.",
    venueShort: "ICCV",
    year: 2023,
    distinction: "Poster",
    paperUrl:
      "https://openaccess.thecvf.com/content/ICCV2023/papers/Kirillov_Segment_Anything_ICCV_2023_paper.pdf",
    codeUrl: "https://github.com/facebookresearch/segment-anything",
    projectUrl: "https://segment-anything.com/",
  },
  {
    id: "deepseek-r1",
    title:
      "DeepSeek-R1 Incentivizes Reasoning in LLMs Through Reinforcement Learning",
    authors: "Daya Guo, Dejian Yang, Haowei Zhang, et al.",
    venue: "Nature 645, pp. 633–638, 2025.",
    venueShort: "Nature",
    year: 2025,
    paperUrl: "https://www.nature.com/articles/s41586-025-09422-z.pdf",
    codeUrl: "https://github.com/deepseek-ai/DeepSeek-R1",
  },
];
