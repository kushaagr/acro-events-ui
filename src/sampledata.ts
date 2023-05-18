interface eventlogI {
    _id: string,
    date: Date,
    title: string,
    description?: string,
    images?: string[]
}

const getevents : eventlogI[] = [
    {
        _id: 'event-1',
        date: new Date('04-Feb-2023'),
        title: 'Hosted a mega-event at Labh Mandapam Indore',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae facere, labore aperiam suscipit doloribus soluta quo alias sequi facilis corporis ab officia necessitatibus. Nisi inventore odio necessitatibus quibusdam tempore amet, illum aut ab assumenda quo labore libero dicta! Fugit minima commodi aut, blanditiis? Eum pariatur architecto adipisci sequi inventore ratione harum quos, magnam error, incidunt id obcaecati porro quisquam molestiae debitis culpa consequatur vel fugiat rerum ab? Distinctio officia assumenda magnam earum cumque voluptatem consectetur sit necessitatibus ratione veniam! Ipsam, pariatur! Excepturi consectetur ut quis reiciendis quod ipsa, ex minus labore, iusto explicabo doloribus voluptate qui incidunt dolorum harum fugiat?',
        images: ['sampleimg1.png']
    },
    {
        _id: 'event-2',
        date: new Date('25-Feb-2023'),
        title: 'Invited guests from 7 countries for Yogdhara',
        images: ['sampleimg1.png', 'sampleimg2.png']
    },
    {
        _id: 'event-3',
        date: new Date('3-April-2023'),
        title: 'Conducted EDC\'s flagship event -- eSummit',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae facere, labore aperiam suscipit doloribus soluta quo alias sequi facilis corporis ab officia necessitatibus. Nisi inventore odio necessitatibus quibusdam tempore amet, illum aut ab assumenda quo labore libero dicta! Fugit minima commodi aut, blanditiis? Eum pariatur architecto adipisci sequi inventore ratione harum quos, magnam error, incidunt id obcaecati porro quisquam molestiae debitis culpa consequatur vel fugiat rerum ab? Distinctio officia assumenda magnam earum cumque voluptatem consectetur sit necessitatibus ratione veniam! Ipsam, pariatur! Excepturi consectetur ut quis reiciendis quod ipsa, ex minus labore, iusto explicabo doloribus voluptate qui incidunt dolorum harum fugiat?',
        images: ['sampleimg1.png', 'sampleimg2.png', 'sampleimg1.png']
    },
    {
        _id: 'event-4',
        date: new Date('6-April-2023'),
        title: 'Ardor (reboot) 2023',
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae facere, labore aperiam suscipit doloribus soluta quo alias sequi facilis corporis ab officia necessitatibus. Nisi inventore odio necessitatibus quibusdam tempore amet, illum aut ab assumenda quo labore libero dicta! Fugit minima commodi aut, blanditiis? Eum pariatur architecto adipisci sequi inventore ratione harum quos, magnam error, incidunt id obcaecati porro quisquam molestiae debitis culpa consequatur vel fugiat rerum ab? Distinctio officia assumenda magnam earum cumque voluptatem consectetur sit necessitatibus ratione veniam! Ipsam, pariatur! Excepturi consectetur ut quis reiciendis quod ipsa, ex minus labore, iusto explicabo doloribus voluptate qui incidunt dolorum harum fugiat?',
        images: []
    },
];

export default getevents;