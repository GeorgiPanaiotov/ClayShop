export type Dress = {
  name: string
  price: number
  onSale: boolean
  favorite: boolean
  sizes: string[]
  selectedSizes: string[]
  selectedColors: string[]
  availableColors: string[]
  description: string
  composition: string
  reviews: number
  score: number
  imgSrcs: string[]
  id: number
  isPopular: boolean
  salePrice: number
}

export const mockedDresses: Dress[] = [
  {
    id: 1,
    name: 'Melinta Dress',
    price: 120,
    salePrice: 120,
    onSale: false,
    favorite: false,
    sizes: ['M', 'L', 'XL', 'XXL'],
    selectedSizes: [''],
    selectedColors: [''],
    availableColors: ['#000000', '#003566', '#06b6d4'],
    description:
      'Dress with tulle and collar Peter Pan from REDValentino (Red Valentino). Peter Pan collar, tulle panels, sleeveless model, concealed back zipper and pleated skirt. Black color',
    composition: '100% Polyester',
    reviews: 415,
    score: 4.5,
    imgSrcs: ['/assets/dress1.jpg'],
    isPopular: true,
  },
  {
    id: 2,
    name: 'Bensita Dress',
    price: 515,
    salePrice: 212.99,
    onSale: true,
    favorite: false,
    sizes: ['M', 'L', 'XL', 'XXL'],
    selectedSizes: [''],
    selectedColors: [''],
    availableColors: ['#000000', '#003566', '#06b6d4'],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque auctor sodales risus et dapibus. Nulla fringilla gravida turpis, ac ornare nibh sagittis a. Etiam eu massa a turpis auctor pharetra a at tortor. Fusce dui leo, tincidunt ut interdum facilisis, congue a dolor. Phasellus sed tellus nec justo imperdiet gravida eget eget orci.',
    composition: '100% Polyester',
    reviews: 0,
    score: 0,
    imgSrcs: ['/assets/dress2_red_1.jpg', '/assets/dress2_red_2.jpg'],
    isPopular: false,
  },
  {
    id: 3,
    name: 'Bensita Dress',
    price: 190,
    salePrice: 54.99,
    onSale: true,
    favorite: false,
    sizes: ['M', 'L'],
    selectedSizes: [''],
    selectedColors: [''],
    availableColors: ['#000000', '#003566', '#06b6d4'],
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in nibh eu leo sagittis convallis in in dui. Nam convallis, eros eu rutrum egestas, nibh.',
    composition: '100% Polyester',
    reviews: 5,
    score: 2.8,
    imgSrcs: ['/assets/dress2_blue_1.jpg', '/assets/dress2_blue_2.jpg', '/assets/dress2_blue_3.jpg'],
    isPopular: false,
  },
  {
    id: 4,
    name: 'Lexima',
    price: 400,
    salePrice: 400,
    onSale: false,
    favorite: false,
    sizes: ['M', 'L', 'XL', 'XXL'],
    selectedSizes: [''],
    selectedColors: [''],
    availableColors: ['#000000', '#003566', '#06b6d4'],
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in.',
    composition: '100% Cotton',
    reviews: 511,
    score: 4.8,
    imgSrcs: ['/assets/dress3_1.jpg', '/assets/dress3_2.jpg', '/assets/dress3_3.jpg'],
    isPopular: true,
  },
]
