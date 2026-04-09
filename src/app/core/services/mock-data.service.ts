import { Injectable } from '@angular/core';
import { Product } from '../models/product.model';
import { Category } from '../models/category.model';
import { Order } from '../models/order.model';
import { User } from '../models/user.model';
import { Coupon } from '../models/coupon.model';
import { Review } from '../models/review.model';
import { Banner, StoreSettings, DashboardMetrics } from '../models/store.model';

@Injectable({ providedIn: 'root' })
export class MockDataService {

  getCategories(): Category[] {
    return [
      { id: 'cat-1', name: 'Moda & Vestuário', slug: 'moda', description: 'Roupas, calçados e acessórios', imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80', icon: '👗', productCount: 124, isActive: true, sortOrder: 1,
        subcategories: [
          { id: 'sub-1-1', name: 'Camisas', slug: 'camisas', parentId: 'cat-1', productCount: 32, isActive: true, sortOrder: 1 },
          { id: 'sub-1-2', name: 'Calças', slug: 'calcas', parentId: 'cat-1', productCount: 28, isActive: true, sortOrder: 2 },
          { id: 'sub-1-3', name: 'Calçados', slug: 'calcados', parentId: 'cat-1', productCount: 45, isActive: true, sortOrder: 3 },
          { id: 'sub-1-4', name: 'Acessórios', slug: 'acessorios-moda', parentId: 'cat-1', productCount: 19, isActive: true, sortOrder: 4 }
        ]
      },
      { id: 'cat-2', name: 'Eletrônicos', slug: 'eletronicos', description: 'Smartphones, notebooks e gadgets', imageUrl: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&q=80', icon: '📱', productCount: 87, isActive: true, sortOrder: 2,
        subcategories: [
          { id: 'sub-2-1', name: 'Smartphones', slug: 'smartphones', parentId: 'cat-2', productCount: 22, isActive: true, sortOrder: 1 },
          { id: 'sub-2-2', name: 'Audio', slug: 'audio', parentId: 'cat-2', productCount: 18, isActive: true, sortOrder: 2 },
          { id: 'sub-2-3', name: 'Wearables', slug: 'wearables', parentId: 'cat-2', productCount: 15, isActive: true, sortOrder: 3 }
        ]
      },
      { id: 'cat-3', name: 'Móveis & Casa', slug: 'moveis', description: 'Decoração e mobiliário premium', imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80', icon: '🛋️', productCount: 56, isActive: true, sortOrder: 3,
        subcategories: [
          { id: 'sub-3-1', name: 'Cadeiras', slug: 'cadeiras', parentId: 'cat-3', productCount: 14, isActive: true, sortOrder: 1 },
          { id: 'sub-3-2', name: 'Mesas', slug: 'mesas', parentId: 'cat-3', productCount: 11, isActive: true, sortOrder: 2 },
          { id: 'sub-3-3', name: 'Iluminação', slug: 'iluminacao', parentId: 'cat-3', productCount: 21, isActive: true, sortOrder: 3 }
        ]
      },
      { id: 'cat-4', name: 'Beleza & Cuidados', slug: 'beleza', imageUrl: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80', icon: '💄', productCount: 93, isActive: true, sortOrder: 4 },
      { id: 'cat-5', name: 'Esportes', slug: 'esportes', imageUrl: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=400&q=80', icon: '🏋️', productCount: 78, isActive: true, sortOrder: 5 },
      { id: 'cat-6', name: 'Automóveis', slug: 'automoveis', imageUrl: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=400&q=80', icon: '🚗', productCount: 42, isActive: true, sortOrder: 6 },
      { id: 'cat-7', name: 'Ingressos', slug: 'ingressos', imageUrl: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&q=80', icon: '🎟️', productCount: 31, isActive: true, sortOrder: 7 },
      { id: 'cat-8', name: 'Fotografia', slug: 'fotografia', imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&q=80', icon: '📷', productCount: 29, isActive: true, sortOrder: 8 },
    ];
  }

  getProducts(): Product[] {
    return [
      {
        id: 'p-001', name: 'Relógio Archetype Cronógrafo', slug: 'relogio-archetype-cronografo',
        description: 'Um cronógrafo de precisão suíça com pulseira de couro italiano. O mostrador minimalista e os índices dourados criam uma peça que transcende tendências. Resistente à água até 50m, com movimento automático de 42 horas de reserva de marcha.',
        shortDescription: 'Cronógrafo de precisão suíça com pulseira de couro italiano.',
        price: 2490, originalPrice: 3200, discountPercent: 22,
        images: [
          { id: 'img-1', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80', alt: 'Relógio Archetype frente', isPrimary: true, order: 1 },
          { id: 'img-2', url: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600&q=80', alt: 'Relógio Archetype detalhe', isPrimary: false, order: 2 },
          { id: 'img-3', url: 'https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=600&q=80', alt: 'Relógio Archetype lateral', isPrimary: false, order: 3 }
        ],
        categoryId: 'cat-2', categoryName: 'Eletrônicos', subcategoryId: 'sub-2-3', subcategoryName: 'Wearables',
        brand: 'Archetype', tags: ['relógio', 'cronógrafo', 'luxo', 'suíço'],
        colorVariants: [
          { id: 'cv-1', name: 'Prateado', value: 'silver', hex: '#C0C0C0', stock: 8, priceModifier: 0 },
          { id: 'cv-2', name: 'Dourado', value: 'gold', hex: '#FFD700', stock: 3, priceModifier: 200 },
          { id: 'cv-3', name: 'Preto', value: 'black', hex: '#1a1a1a', stock: 12, priceModifier: 0 }
        ],
        sizeVariants: [],
        stock: 23, stockStatus: 'in_stock', stockThreshold: 5,
        isActive: true, isFeatured: true, isLimitedEdition: false, isNewArrival: false, isPremiumPlacement: true,
        rating: 4.8, reviewCount: 42, soldCount: 187,
        priceType: 'promotional',
        fiscal: { sku: 'ARCH-001', barcode: '7891234567890', ncm: '9102.11.00' },
        createdAt: new Date('2024-01-15'), updatedAt: new Date('2024-03-10')
      },
      {
        id: 'p-002', name: 'Fones Sonic Over-Ear Pro', slug: 'fones-sonic-over-ear-pro',
        description: 'Experiência sonora premium com cancelamento de ruído ativo de última geração. Drivers de 40mm com resposta de frequência de 20Hz a 20kHz. Bateria de 30 horas, carga rápida de 15 minutos para 3 horas de uso.',
        shortDescription: 'Fones premium com cancelamento de ruído ativo e 30h de bateria.',
        price: 380, originalPrice: 520,
        images: [
          { id: 'img-4', url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80', alt: 'Fones Sonic Pro', isPrimary: true, order: 1 },
          { id: 'img-5', url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600&q=80', alt: 'Fones Sonic detalhe', isPrimary: false, order: 2 }
        ],
        categoryId: 'cat-2', categoryName: 'Eletrônicos', subcategoryId: 'sub-2-2', subcategoryName: 'Audio',
        brand: 'Sonic', tags: ['fones', 'audio', 'noise cancelling'],
        colorVariants: [
          { id: 'cv-4', name: 'Preto Noite', value: 'black', hex: '#1C1C1C', stock: 15, priceModifier: 0 },
          { id: 'cv-5', name: 'Branco Areia', value: 'white', hex: '#F5F0E8', stock: 8, priceModifier: 0 },
          { id: 'cv-6', name: 'Roxo Cósmico', value: 'purple', hex: '#7B2FBE', stock: 5, priceModifier: 20 }
        ],
        sizeVariants: [],
        stock: 28, stockStatus: 'in_stock', stockThreshold: 5,
        isActive: true, isFeatured: true, isLimitedEdition: false, isNewArrival: true, isPremiumPlacement: false,
        rating: 4.6, reviewCount: 89, soldCount: 342,
        priceType: 'standard',
        fiscal: { sku: 'SONI-992', barcode: '7891234567891', ncm: '8518.30.00' },
        createdAt: new Date('2024-02-10'), updatedAt: new Date('2024-03-15')
      },
      {
        id: 'p-003', name: 'Tênis Velocity Runner X', slug: 'tenis-velocity-runner-x',
        description: 'Desenvolvido com tecnologia de amortecimento reactiva para corredores de alto desempenho. Cabedal em mesh respirável com estrutura de suporte dinâmico. Solado de carbono para máxima propulsão e eficiência energética.',
        shortDescription: 'Tênis de alta performance com tecnologia reativa de amortecimento.',
        price: 125, originalPrice: 125,
        images: [
          { id: 'img-6', url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80', alt: 'Tênis Velocity Runner', isPrimary: true, order: 1 },
          { id: 'img-7', url: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=600&q=80', alt: 'Tênis Velocity lateral', isPrimary: false, order: 2 },
          { id: 'img-8', url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80', alt: 'Tênis Velocity sola', isPrimary: false, order: 3 }
        ],
        categoryId: 'cat-1', categoryName: 'Moda & Vestuário', subcategoryId: 'sub-1-3', subcategoryName: 'Calçados',
        brand: 'Velocity', tags: ['tênis', 'corrida', 'performance', 'esporte'],
        colorVariants: [
          { id: 'cv-7', name: 'Vermelho', value: 'red', hex: '#DC2626', stock: 20, priceModifier: 0 },
          { id: 'cv-8', name: 'Azul Cobalto', value: 'blue', hex: '#1D4ED8', stock: 18, priceModifier: 0 },
          { id: 'cv-9', name: 'Preto', value: 'black', hex: '#111111', stock: 35, priceModifier: 0 }
        ],
        sizeVariants: [
          { id: 'sv-1', name: '38', value: '38', stock: 5, priceModifier: 0 },
          { id: 'sv-2', name: '39', value: '39', stock: 8, priceModifier: 0 },
          { id: 'sv-3', name: '40', value: '40', stock: 12, priceModifier: 0 },
          { id: 'sv-4', name: '41', value: '41', stock: 15, priceModifier: 0 },
          { id: 'sv-5', name: '42', value: '42', stock: 20, priceModifier: 0 },
          { id: 'sv-6', name: '43', value: '43', stock: 13, priceModifier: 0 },
          { id: 'sv-7', name: '44', value: '44', stock: 0, priceModifier: 0 },
          { id: 'sv-8', name: '45', value: '45', stock: 4, priceModifier: 0 }
        ],
        stock: 73, stockStatus: 'in_stock', stockThreshold: 10,
        isActive: true, isFeatured: true, isLimitedEdition: false, isNewArrival: false, isPremiumPlacement: false,
        rating: 4.7, reviewCount: 156, soldCount: 628,
        priceType: 'flash_sale',
        fiscal: { sku: 'VELO-X21', barcode: '7891234567892', ncm: '6403.99.90' },
        createdAt: new Date('2023-11-01'), updatedAt: new Date('2024-03-20')
      },
      {
        id: 'p-004', name: 'Câmera Luna Film 35mm', slug: 'camera-luna-film-35mm',
        description: 'A renascença do analógico em um corpo moderno. Câmera 35mm com controles manuais completos, obturador de 1/500s e visor óptico brilhante. Compatível com lentes M39 vintage e novas produções. Inclui case de couro artesanal.',
        shortDescription: 'Câmera 35mm analógica com corpo moderno e lentes M39 vintage.',
        price: 540, originalPrice: 540,
        images: [
          { id: 'img-9', url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=600&q=80', alt: 'Câmera Luna Film', isPrimary: true, order: 1 },
          { id: 'img-10', url: 'https://images.unsplash.com/photo-1452780212461-697e85f96aa0?w=600&q=80', alt: 'Câmera Luna detalhe', isPrimary: false, order: 2 }
        ],
        categoryId: 'cat-8', categoryName: 'Fotografia',
        brand: 'Luna', tags: ['câmera', 'analógica', 'filme', 'fotografia'],
        colorVariants: [
          { id: 'cv-10', name: 'Prata Clássico', value: 'silver', hex: '#B8B8B8', stock: 3, priceModifier: 0 },
          { id: 'cv-11', name: 'Preto Matte', value: 'black', hex: '#2A2A2A', stock: 5, priceModifier: 50 }
        ],
        sizeVariants: [],
        stock: 8, stockStatus: 'low_stock', stockThreshold: 5,
        isActive: true, isFeatured: false, isLimitedEdition: true, isNewArrival: false, isPremiumPlacement: false,
        rating: 4.9, reviewCount: 28, soldCount: 74,
        priceType: 'standard',
        fiscal: { sku: 'LUNA-CAM', barcode: '7891234567893', ncm: '9006.53.00' },
        createdAt: new Date('2023-08-15'), updatedAt: new Date('2024-02-28')
      },
      {
        id: 'p-005', name: 'Cadeira Eames Lounge Style', slug: 'cadeira-eames-lounge-style',
        description: 'Inspirada no design clássico de meados do século, esta poltrona une conforto e elegância. Estrutura em madeira compensada curvada com almofadas em couro PU premium. Ideal para escritório ou sala de estar sofisticada.',
        shortDescription: 'Poltrona estilo Eames em madeira curvada com couro PU premium.',
        price: 1250, originalPrice: 1600,
        images: [
          { id: 'img-11', url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=600&q=80', alt: 'Cadeira Eames Style', isPrimary: true, order: 1 },
          { id: 'img-12', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80', alt: 'Cadeira Eames ambiente', isPrimary: false, order: 2 }
        ],
        categoryId: 'cat-3', categoryName: 'Móveis & Casa', subcategoryId: 'sub-3-1', subcategoryName: 'Cadeiras',
        brand: 'Lumina', tags: ['cadeira', 'poltrona', 'design', 'eames'],
        colorVariants: [
          { id: 'cv-12', name: 'Caramelo', value: 'caramel', hex: '#C19A6B', stock: 6, priceModifier: 0 },
          { id: 'cv-13', name: 'Preto', value: 'black', hex: '#1a1a1a', stock: 9, priceModifier: 0 },
          { id: 'cv-14', name: 'Branco Off', value: 'offwhite', hex: '#F5F0E8', stock: 4, priceModifier: 100 }
        ],
        sizeVariants: [],
        stock: 19, stockStatus: 'in_stock', stockThreshold: 3,
        isActive: true, isFeatured: true, isLimitedEdition: false, isNewArrival: true, isPremiumPlacement: true,
        rating: 4.5, reviewCount: 19, soldCount: 53,
        priceType: 'promotional',
        fiscal: { sku: 'EAM-LNG-001', barcode: '7891234567894', ncm: '9401.61.00' },
        createdAt: new Date('2024-01-20'), updatedAt: new Date('2024-03-18')
      },
      {
        id: 'p-006', name: 'Camiseta Essential Tee Oversized', slug: 'camiseta-essential-tee-oversized',
        description: 'O básico que nunca sai de moda, repensado. Algodão supima de 200g com toque acetinado. Caimento oversized com barra reto, gola estruturada e costura dupla em todas as extremidades. Lavável à máquina sem deformação.',
        shortDescription: 'Camiseta oversized em algodão supima 200g com gola estruturada.',
        price: 110, originalPrice: 110,
        images: [
          { id: 'img-13', url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=80', alt: 'Camiseta Essential Tee', isPrimary: true, order: 1 },
          { id: 'img-14', url: 'https://images.unsplash.com/photo-1622470953794-aa9c70b0fb9d?w=600&q=80', alt: 'Camiseta detalhe', isPrimary: false, order: 2 }
        ],
        categoryId: 'cat-1', categoryName: 'Moda & Vestuário', subcategoryId: 'sub-1-1', subcategoryName: 'Camisas',
        brand: 'Curator', tags: ['camiseta', 'oversized', 'básico', 'algodão'],
        colorVariants: [
          { id: 'cv-15', name: 'Creme', value: 'cream', hex: '#F5F0DC', stock: 25, priceModifier: 0 },
          { id: 'cv-16', name: 'Preto', value: 'black', hex: '#111111', stock: 30, priceModifier: 0 },
          { id: 'cv-17', name: 'Cinza', value: 'gray', hex: '#9CA3AF', stock: 20, priceModifier: 0 },
          { id: 'cv-18', name: 'Azul Céu', value: 'skyblue', hex: '#7DD3FC', stock: 15, priceModifier: 0 }
        ],
        sizeVariants: [
          { id: 'sv-9', name: 'PP', value: 'XS', stock: 10, priceModifier: 0 },
          { id: 'sv-10', name: 'P', value: 'S', stock: 18, priceModifier: 0 },
          { id: 'sv-11', name: 'M', value: 'M', stock: 25, priceModifier: 0 },
          { id: 'sv-12', name: 'G', value: 'L', stock: 20, priceModifier: 0 },
          { id: 'sv-13', name: 'GG', value: 'XL', stock: 12, priceModifier: 0 },
          { id: 'sv-14', name: 'XGG', value: 'XXL', stock: 5, priceModifier: 5 }
        ],
        stock: 90, stockStatus: 'in_stock', stockThreshold: 10,
        isActive: true, isFeatured: false, isLimitedEdition: false, isNewArrival: true, isPremiumPlacement: false,
        rating: 4.4, reviewCount: 67, soldCount: 289,
        priceType: 'standard',
        fiscal: { sku: 'ESS-TEE-001', barcode: '7891234567895', ncm: '6109.10.00' },
        createdAt: new Date('2024-02-01'), updatedAt: new Date('2024-03-22')
      },
      {
        id: 'p-007', name: 'Luminária Pendente Aura', slug: 'luminaria-pendente-aura',
        description: 'Design escultural em vidro soprado artesanalmente. A cúpula esférica com acabamento fumê cria um jogo de luz única no ambiente. Cabo têxtil de 1,5m ajustável, compatível com LED E27 até 40W. Ideal para sala de jantar ou balcão de cozinha.',
        shortDescription: 'Pendente artesanal em vidro soprado com acabamento fumê único.',
        price: 890, originalPrice: 890,
        images: [
          { id: 'img-15', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', alt: 'Luminária Pendente Aura', isPrimary: true, order: 1 },
          { id: 'img-16', url: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600&q=80', alt: 'Luminária Aura ambiente', isPrimary: false, order: 2 }
        ],
        categoryId: 'cat-3', categoryName: 'Móveis & Casa', subcategoryId: 'sub-3-3', subcategoryName: 'Iluminação',
        brand: 'Lumina', tags: ['luminária', 'pendente', 'vidro', 'decoração'],
        colorVariants: [
          { id: 'cv-19', name: 'Fumê', value: 'smoke', hex: '#6B7280', stock: 7, priceModifier: 0 },
          { id: 'cv-20', name: 'Âmbar', value: 'amber', hex: '#D97706', stock: 5, priceModifier: 50 },
          { id: 'cv-21', name: 'Transparente', value: 'clear', hex: '#E5E7EB', stock: 9, priceModifier: 0 }
        ],
        sizeVariants: [],
        stock: 21, stockStatus: 'in_stock', stockThreshold: 3,
        isActive: true, isFeatured: true, isLimitedEdition: false, isNewArrival: false, isPremiumPlacement: true,
        rating: 4.9, reviewCount: 33, soldCount: 91,
        priceType: 'standard',
        fiscal: { sku: 'AURA-PND-001', barcode: '7891234567896', ncm: '9405.20.00' },
        createdAt: new Date('2023-10-05'), updatedAt: new Date('2024-03-05')
      },
      {
        id: 'p-008', name: 'Mesa Monolith Mármore', slug: 'mesa-monolith-marmore',
        description: 'Mesa de centro com tampo em mármore negro carrara e base em aço inox escovado. Cada peça é única devido às veias naturais do mármore. Medidas: 120x60x42cm. Entrega com montagem inclusa em capitais.',
        shortDescription: 'Mesa de centro em mármore negro carrara com base em aço inox.',
        price: 3400, originalPrice: 4200,
        images: [
          { id: 'img-17', url: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=600&q=80', alt: 'Mesa Monolith', isPrimary: true, order: 1 }
        ],
        categoryId: 'cat-3', categoryName: 'Móveis & Casa', subcategoryId: 'sub-3-2', subcategoryName: 'Mesas',
        brand: 'Monolith', tags: ['mesa', 'mármore', 'design', 'luxo'],
        colorVariants: [
          { id: 'cv-22', name: 'Negro Carrara', value: 'black_marble', hex: '#1F2937', stock: 2, priceModifier: 0 },
          { id: 'cv-23', name: 'Branco Carrara', value: 'white_marble', hex: '#F3F4F6', stock: 3, priceModifier: 200 }
        ],
        sizeVariants: [],
        stock: 5, stockStatus: 'low_stock', stockThreshold: 2,
        isActive: true, isFeatured: true, isLimitedEdition: true, isNewArrival: false, isPremiumPlacement: false,
        rating: 5.0, reviewCount: 12, soldCount: 24,
        priceType: 'promotional',
        fiscal: { sku: 'MONO-TB-001', barcode: '7891234567897', ncm: '9403.30.00' },
        createdAt: new Date('2023-09-01'), updatedAt: new Date('2024-03-01')
      },
      {
        id: 'p-009', name: 'Capa Almofada Veludo Terracota', slug: 'almofada-veludo-terracota',
        description: 'Capa de almofada em veludo português de alta gramatura. Textura rica com acabamento que captura a luz naturalmente. Zíper oculto e enchimento não incluído. Tamanho: 50x50cm. Lavável a 30°C.',
        shortDescription: 'Capa de almofada em veludo português 50x50 com zíper oculto.',
        price: 120, originalPrice: 120,
        images: [
          { id: 'img-18', url: 'https://images.unsplash.com/photo-1592789705501-f9ae4278a9c9?w=600&q=80', alt: 'Almofada Veludo Terracota', isPrimary: true, order: 1 }
        ],
        categoryId: 'cat-3', categoryName: 'Móveis & Casa',
        brand: 'Lumina', tags: ['almofada', 'veludo', 'decoração', 'casa'],
        colorVariants: [
          { id: 'cv-24', name: 'Terracota', value: 'terracota', hex: '#C2623B', stock: 18, priceModifier: 0 },
          { id: 'cv-25', name: 'Verde Sage', value: 'sage', hex: '#84A98C', stock: 14, priceModifier: 0 },
          { id: 'cv-26', name: 'Azul Petróleo', value: 'teal', hex: '#2D6A4F', stock: 11, priceModifier: 0 }
        ],
        sizeVariants: [],
        stock: 43, stockStatus: 'in_stock', stockThreshold: 5,
        isActive: true, isFeatured: false, isLimitedEdition: false, isNewArrival: true, isPremiumPlacement: false,
        rating: 4.3, reviewCount: 44, soldCount: 176,
        priceType: 'standard',
        fiscal: { sku: 'VELV-ALM-001', barcode: '7891234567898', ncm: '9404.90.00' },
        createdAt: new Date('2024-02-15'), updatedAt: new Date('2024-03-25')
      },
      {
        id: 'p-010', name: 'Ingresso Show Coldplay – São Paulo', slug: 'ingresso-coldplay-sao-paulo',
        description: 'Ingresso para o show do Coldplay – Music of the Spheres World Tour. Allianz Parque, São Paulo. Data: 15 de Novembro de 2024. Setor: Pista Premium. Inclui acesso às áreas VIP e kit de boas-vindas com pulseira colecionável.',
        shortDescription: 'Ingresso Pista Premium – Coldplay São Paulo, 15/11/2024.',
        price: 750, originalPrice: 750,
        images: [
          { id: 'img-19', url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80', alt: 'Show Coldplay', isPrimary: true, order: 1 }
        ],
        categoryId: 'cat-7', categoryName: 'Ingressos',
        brand: 'Ticketmaster', tags: ['ingresso', 'show', 'coldplay', 'música'],
        colorVariants: [],
        sizeVariants: [
          { id: 'sv-15', name: 'Pista Premium', value: 'pista_premium', stock: 50, priceModifier: 0 },
          { id: 'sv-16', name: 'Arquibancada Numerada', value: 'arquibancada', stock: 120, priceModifier: -200 },
          { id: 'sv-17', name: 'Camarote VIP', value: 'camarote', stock: 15, priceModifier: 500 }
        ],
        stock: 185, stockStatus: 'in_stock', stockThreshold: 20,
        isActive: true, isFeatured: true, isLimitedEdition: false, isNewArrival: true, isPremiumPlacement: true,
        rating: 4.9, reviewCount: 8, soldCount: 210,
        priceType: 'standard',
        fiscal: { sku: 'TICK-COLD-001', barcode: '7891234567899', ncm: '9999.99.99' },
        createdAt: new Date('2024-03-01'), updatedAt: new Date('2024-03-01')
      },
      {
        id: 'p-011', name: 'Perfume Maison Noir Absolu', slug: 'perfume-maison-noir-absolu',
        description: 'Uma fragrância oriental amadeirada de caráter magnético. Notas de topo: bergamota e pimenta rosa. Coração: oud árabe e âmbar cinzento. Base: sândalo, baunilha negra e musgo branco. Concentração: Extrait de Parfum 30%, 50ml.',
        shortDescription: 'Extrait de Parfum 30% com notas orientais de oud e âmbar cinzento.',
        price: 620, originalPrice: 800,
        images: [
          { id: 'img-20', url: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=600&q=80', alt: 'Perfume Maison Noir', isPrimary: true, order: 1 }
        ],
        categoryId: 'cat-4', categoryName: 'Beleza & Cuidados',
        brand: 'Maison Noir', tags: ['perfume', 'fragrância', 'oud', 'luxo'],
        colorVariants: [],
        sizeVariants: [
          { id: 'sv-18', name: '30ml', value: '30ml', stock: 15, priceModifier: -150 },
          { id: 'sv-19', name: '50ml', value: '50ml', stock: 12, priceModifier: 0 },
          { id: 'sv-20', name: '100ml', value: '100ml', stock: 8, priceModifier: 200 }
        ],
        stock: 35, stockStatus: 'in_stock', stockThreshold: 5,
        isActive: true, isFeatured: true, isLimitedEdition: true, isNewArrival: false, isPremiumPlacement: false,
        rating: 4.7, reviewCount: 31, soldCount: 96,
        priceType: 'promotional',
        fiscal: { sku: 'MSN-NOIR-001', barcode: '7891234567900', ncm: '3303.00.20' },
        createdAt: new Date('2023-12-01'), updatedAt: new Date('2024-03-10')
      },
      {
        id: 'p-012', name: 'SUV Aventura Off-Road 4x4', slug: 'suv-aventura-off-road',
        description: 'SUV de alto desempenho com tração 4x4 permanente e suspensão off-road elevada. Motor V6 3.0 turbo diesel 250cv, câmbio automático 8 marchas. Interior em couro premium com painel digital 12". Quilometragem: 45.000km. Ano: 2022.',
        shortDescription: 'SUV 4x4 V6 Turbo Diesel 2022, 45.000km, interior couro premium.',
        price: 185000, originalPrice: 210000,
        images: [
          { id: 'img-21', url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&q=80', alt: 'SUV Aventura', isPrimary: true, order: 1 },
          { id: 'img-22', url: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=600&q=80', alt: 'SUV interior', isPrimary: false, order: 2 }
        ],
        categoryId: 'cat-6', categoryName: 'Automóveis',
        brand: 'Aventura', tags: ['suv', 'offroad', '4x4', 'diesel'],
        colorVariants: [
          { id: 'cv-27', name: 'Prata Metálico', value: 'silver', hex: '#D1D5DB', stock: 1, priceModifier: 0 },
          { id: 'cv-28', name: 'Preto Ónix', value: 'black', hex: '#111827', stock: 1, priceModifier: 2000 },
          { id: 'cv-29', name: 'Branco Perolado', value: 'white', hex: '#F9FAFB', stock: 1, priceModifier: 1500 }
        ],
        sizeVariants: [],
        stock: 3, stockStatus: 'low_stock', stockThreshold: 1,
        isActive: true, isFeatured: true, isLimitedEdition: false, isNewArrival: false, isPremiumPlacement: true,
        rating: 4.8, reviewCount: 5, soldCount: 12,
        priceType: 'promotional',
        fiscal: { sku: 'SUV-ADV-001', barcode: '9999999999999', ncm: '8703.23.10' },
        createdAt: new Date('2024-01-10'), updatedAt: new Date('2024-03-15')
      }
    ];
  }

  getReviews(productId: string): Review[] {
    return [
      {
        id: 'r-1', productId, userId: 'u-2', userName: 'Ana Silva', userAvatarUrl: '',
        rating: 5, title: 'Produto incrível, superou expectativas!',
        body: 'Recebi o produto em 3 dias. A qualidade é excelente, muito melhor do que esperava. As fotos não fazem jus à peça real. Já recomendei para vários amigos.',
        isVerifiedPurchase: true, helpfulCount: 24, status: 'approved',
        createdAt: new Date('2024-02-10')
      },
      {
        id: 'r-2', productId, userId: 'u-3', userName: 'Carlos Mendes',
        rating: 4, title: 'Muito bom, mas embalagem poderia ser melhor',
        body: 'O produto em si é excelente, construção sólida e acabamento impecável. Só achei a embalagem um pouco simples para o preço. Nada que comprometa a experiência.',
        isVerifiedPurchase: true, helpfulCount: 11, status: 'approved',
        createdAt: new Date('2024-01-25')
      },
      {
        id: 'r-3', productId, userId: 'u-4', userName: 'Mariana Costa',
        rating: 5, title: 'Compra certíssima!',
        body: 'Já é minha segunda compra nesta loja. Qualidade consistente, entrega rápida e suporte excelente. Produto está funcionando perfeitamente.',
        isVerifiedPurchase: true, helpfulCount: 8, status: 'approved',
        createdAt: new Date('2024-01-18')
      },
      {
        id: 'r-4', productId, userId: 'u-5', userName: 'Roberto Lima',
        rating: 3, title: 'Bom, mas com ressalvas',
        body: 'O produto chegou dentro do prazo e com tudo certo. Porém, o acabamento em alguns detalhes poderia ser mais refinado considerando o preço. Funciona bem para o propósito.',
        isVerifiedPurchase: false, helpfulCount: 4, status: 'approved',
        createdAt: new Date('2024-01-05')
      }
    ];
  }

  getOrders(): Order[] {
    return [
      {
        id: 'ord-001', orderNumber: 'ORD-9421', userId: 'u-1',
        customerName: 'Juliana Smith', customerEmail: 'juliana@email.com',
        items: [
          { id: 'oi-1', productId: 'p-001', productName: 'Relógio Archetype Cronógrafo', productImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80', sku: 'ARCH-001', selectedColor: 'Dourado', selectedColorHex: '#FFD700', quantity: 1, unitPrice: 2690, totalPrice: 2690 },
          { id: 'oi-2', productId: 'p-006', productName: 'Camiseta Essential Tee', productImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80', sku: 'ESS-TEE-001', selectedColor: 'Creme', selectedSize: 'M', quantity: 2, unitPrice: 110, totalPrice: 220 }
        ],
        shippingAddress: { id: 'addr-1', label: 'Casa', recipientName: 'Juliana Smith', street: 'Av. Paulista', number: '1000', complement: 'Apto 82', neighborhood: 'Bela Vista', city: 'São Paulo', state: 'SP', zipCode: '01310-100', country: 'Brasil', isDefault: true },
        status: 'processing', paymentStatus: 'paid', paymentMethod: 'credit_card',
        subtotal: 2910, discountAmount: 0, shippingCost: 0, tax: 232.80, total: 3142.80,
        createdAt: new Date('2024-03-24'), updatedAt: new Date('2024-03-24')
      },
      {
        id: 'ord-002', orderNumber: 'ORD-9420', userId: 'u-2',
        customerName: 'Marcus Kane', customerEmail: 'marcus@email.com',
        items: [
          { id: 'oi-3', productId: 'p-002', productName: 'Fones Sonic Over-Ear Pro', productImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80', sku: 'SONI-992', selectedColor: 'Preto Noite', quantity: 1, unitPrice: 380, totalPrice: 380 }
        ],
        shippingAddress: { id: 'addr-2', label: 'Trabalho', recipientName: 'Marcus Kane', street: 'Rua Augusta', number: '500', neighborhood: 'Consolação', city: 'São Paulo', state: 'SP', zipCode: '01305-000', country: 'Brasil', isDefault: false },
        status: 'shipped', paymentStatus: 'paid', paymentMethod: 'pix',
        subtotal: 380, discountAmount: 0, shippingCost: 19.90, tax: 30.40, total: 430.30, trackingCode: 'BR123456789BR',
        createdAt: new Date('2024-03-23'), updatedAt: new Date('2024-03-25')
      },
      {
        id: 'ord-003', orderNumber: 'ORD-9419', userId: 'u-3',
        customerName: 'Elena Lopez', customerEmail: 'elena@email.com',
        items: [
          { id: 'oi-4', productId: 'p-009', productName: 'Almofada Veludo Terracota', productImage: 'https://images.unsplash.com/photo-1592789705501-f9ae4278a9c9?w=200&q=80', sku: 'VELV-ALM-001', selectedColor: 'Terracota', quantity: 2, unitPrice: 120, totalPrice: 240 }
        ],
        shippingAddress: { id: 'addr-3', label: 'Casa', recipientName: 'Elena Lopez', street: 'Rua da Consolação', number: '220', neighborhood: 'Higienópolis', city: 'São Paulo', state: 'SP', zipCode: '01302-000', country: 'Brasil', isDefault: true },
        status: 'delivered', paymentStatus: 'paid', paymentMethod: 'credit_card',
        subtotal: 240, discountAmount: 20, couponCode: 'WELCOME10', shippingCost: 0, tax: 17.60, total: 237.60,
        deliveredAt: new Date('2024-03-23'),
        createdAt: new Date('2024-03-20'), updatedAt: new Date('2024-03-23')
      },
      {
        id: 'ord-004', orderNumber: 'ORD-9418', userId: 'u-4',
        customerName: 'Thomas Wright', customerEmail: 'thomas@email.com',
        items: [
          { id: 'oi-5', productId: 'p-005', productName: 'Cadeira Eames Lounge Style', productImage: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&q=80', sku: 'EAM-LNG-001', selectedColor: 'Caramelo', quantity: 1, unitPrice: 1250, totalPrice: 1250 }
        ],
        shippingAddress: { id: 'addr-4', label: 'Casa', recipientName: 'Thomas Wright', street: 'Al. Santos', number: '1800', neighborhood: 'Jardins', city: 'São Paulo', state: 'SP', zipCode: '01419-002', country: 'Brasil', isDefault: true },
        status: 'cancelled', paymentStatus: 'refunded', paymentMethod: 'credit_card',
        subtotal: 1250, discountAmount: 0, shippingCost: 45, tax: 100, total: 1395, notes: 'Cancelamento solicitado pelo cliente',
        createdAt: new Date('2024-03-22'), updatedAt: new Date('2024-03-22')
      },
      {
        id: 'ord-005', orderNumber: 'ORD-9417', userId: 'u-5',
        customerName: 'Alice Anderson', customerEmail: 'alice@email.com',
        items: [
          { id: 'oi-6', productId: 'p-003', productName: 'Tênis Velocity Runner X', productImage: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&q=80', sku: 'VELO-X21', selectedColor: 'Vermelho', selectedSize: '38', quantity: 1, unitPrice: 125, totalPrice: 125 },
          { id: 'oi-7', productId: 'p-006', productName: 'Camiseta Essential Tee', productImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80', sku: 'ESS-TEE-001', selectedColor: 'Preto', selectedSize: 'P', quantity: 1, unitPrice: 110, totalPrice: 110 }
        ],
        shippingAddress: { id: 'addr-5', label: 'Casa', recipientName: 'Alice Anderson', street: 'Rua Oscar Freire', number: '900', neighborhood: 'Jardins', city: 'São Paulo', state: 'SP', zipCode: '01426-001', country: 'Brasil', isDefault: true },
        status: 'delivered', paymentStatus: 'paid', paymentMethod: 'pix',
        subtotal: 235, discountAmount: 0, shippingCost: 15.90, tax: 18.80, total: 269.70,
        deliveredAt: new Date('2024-03-22'),
        createdAt: new Date('2024-03-19'), updatedAt: new Date('2024-03-22')
      }
    ];
  }

  getCoupons(): Coupon[] {
    return [
      {
        id: 'coup-1', code: 'WELCOME10', description: '10% de desconto para novos clientes', type: 'percentage', value: 10,
        minOrderValue: 100, maxDiscount: 50, usageLimit: 1000, usageCount: 342, perUserLimit: 1, isActive: true,
        startDate: new Date('2024-01-01'), expiryDate: new Date('2024-12-31'), createdAt: new Date('2024-01-01')
      },
      {
        id: 'coup-2', code: 'FRETE0', description: 'Frete grátis em qualquer pedido', type: 'free_shipping', value: 0,
        usageLimit: 500, usageCount: 128, isActive: true,
        expiryDate: new Date('2024-06-30'), createdAt: new Date('2024-02-01')
      },
      {
        id: 'coup-3', code: 'VIP50', description: 'R$50 de desconto para clientes VIP', type: 'fixed', value: 50,
        minOrderValue: 300, usageLimit: 200, usageCount: 89, isActive: true,
        expiryDate: new Date('2024-05-31'), createdAt: new Date('2024-03-01')
      },
      {
        id: 'coup-4', code: 'VERAO20', description: 'Coleção verão com 20% off', type: 'percentage', value: 20,
        minOrderValue: 150, maxDiscount: 100, usageLimit: 300, usageCount: 156, isActive: false,
        startDate: new Date('2024-01-15'), expiryDate: new Date('2024-03-15'), createdAt: new Date('2024-01-10')
      }
    ];
  }

  getStoreSettings(): StoreSettings {
    return {
      id: 'store-1',
      storeName: 'The Curator',
      storeSlug: 'the-curator',
      logoUrl: '',
      description: 'Curating the finest in modern commerce.',
      email: 'contato@thecurator.com.br',
      phone: '+55 11 3000-0000',
      whatsapp: '+5511999990000',
      cnpj: '12.345.678/0001-90',
      activeTemplateId: 'tpl-1',
      primaryColor: '#004be3',
      accentColor: '#f893e7',
      banners: [
        { id: 'ban-1', title: 'Nova Coleção Verão 2024', subtitle: 'Descubra as últimas tendências', imageUrl: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=80', ctaText: 'Explorar Coleção', ctaLink: '/catalogo', badge: 'Novo', isActive: true, sortOrder: 1 },
        { id: 'ban-2', title: 'Eletrônicos Premium', subtitle: 'Até 30% de desconto', imageUrl: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200&q=80', ctaText: 'Ver Ofertas', ctaLink: '/catalogo?categoria=eletronicos', isActive: true, sortOrder: 2 },
        { id: 'ban-3', title: 'Design de Interiores', subtitle: 'Transforme seu espaço', imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1200&q=80', ctaText: 'Descobrir', ctaLink: '/catalogo?categoria=moveis', isActive: true, sortOrder: 3 }
      ],
      carousels: [],
      socialLinks: { instagram: '@thecurator', facebook: '/thecurator', twitter: '@thecurator' },
      seoTitle: 'The Curator – Produtos Premium Selecionados',
      seoDescription: 'Descobra produtos premium com curadoria especial.',
      freeShippingThreshold: 300,
      taxRate: 8,
      currency: 'BRL',
      currencySymbol: 'R$',
      enableReviews: true,
      enableWishlist: true,
      enableCompare: false,
      maintenanceMode: false,
      updatedAt: new Date('2024-03-25')
    };
  }

  getDashboardMetrics(): DashboardMetrics {
    return {
      todaySales: 12480,
      todayOrders: 8,
      pendingOrders: 24,
      totalProducts: 842,
      lowStockProducts: 7,
      totalCustomers: 1248,
      monthlyRevenue: 128430,
      monthlyGrowth: 12.5,
      monthlyReach: 145000,
      conversionRate: 3.8,
      avgOrderValue: 287,
      refundRate: 1.2,
      revenueChart: [
        { label: 'Seg', value: 8200 }, { label: 'Ter', value: 9450 }, { label: 'Qua', value: 12480 },
        { label: 'Qui', value: 7800 }, { label: 'Sex', value: 11200 }, { label: 'Sáb', value: 14300 }, { label: 'Dom', value: 6800 }
      ],
      topProducts: [
        { productId: 'p-003', name: 'Tênis Velocity Runner X', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80', sales: 628, revenue: 78500 },
        { productId: 'p-002', name: 'Fones Sonic Over-Ear Pro', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&q=80', sales: 342, revenue: 129960 },
        { productId: 'p-006', name: 'Camiseta Essential Tee', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&q=80', sales: 289, revenue: 31790 }
      ],
      recentOrders: [],
      salesByCategory: [
        { category: 'Eletrônicos', revenue: 45200, percent: 35.2 },
        { category: 'Moda', revenue: 32100, percent: 25.0 },
        { category: 'Móveis', revenue: 24800, percent: 19.3 },
        { category: 'Beleza', revenue: 15600, percent: 12.1 },
        { category: 'Outros', revenue: 10730, percent: 8.4 }
      ]
    };
  }

  getCurrentUser(): User {
    return {
      id: 'u-1', name: 'Alexander Lumina', email: 'alex@lumina.shop',
      phone: '+55 11 99999-0000', cpf: '123.456.789-00',
      role: 'customer', newsletterOptIn: true, isActive: true,
      avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
      addresses: [
        { id: 'addr-1', label: 'Casa', recipientName: 'Alexander Lumina', street: '742 Evergreen Terrace', number: '742', city: 'São Paulo', state: 'SP', zipCode: '01310-100', neighborhood: 'Jardins', country: 'Brasil', isDefault: true },
        { id: 'addr-2', label: 'Trabalho', recipientName: 'Alexander Lumina', street: 'Av. Brigadeiro Faria Lima', number: '3900', complement: 'Sala 202', city: 'São Paulo', state: 'SP', zipCode: '04538-132', neighborhood: 'Itaim Bibi', country: 'Brasil', isDefault: false }
      ],
      paymentMethods: [
        { id: 'pm-1', type: 'credit_card', brand: 'Visa', lastFour: '4421', holderName: 'ALEXANDER LUMINA', expiryMonth: 12, expiryYear: 2027, isDefault: true },
        { id: 'pm-2', type: 'pix', isDefault: false }
      ],
      wishlist: ['p-001', 'p-007', 'p-011'],
      totalOrders: 12, totalSpent: 8420,
      createdAt: new Date('2023-06-15'), lastLoginAt: new Date('2024-03-25')
    };
  }

  getAdminUser(): User {
    return {
      id: 'admin-1', name: 'Lumina Admin', email: 'admin@thecurator.com',
      role: 'admin', isActive: true, newsletterOptIn: false,
      addresses: [], paymentMethods: [], wishlist: [],
      totalOrders: 0, totalSpent: 0,
      createdAt: new Date('2023-01-01')
    };
  }
}
