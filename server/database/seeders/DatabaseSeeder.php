<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Teacher;
use App\Models\Event;
use App\Models\News;
use App\Models\Review;
use App\Models\ClassRoom;
use App\Models\MenuItem;
use App\Models\Gallery;
use App\Models\Program;
use App\Models\PricingPlan;
use App\Models\Faq;
use App\Models\Setting;

class DatabaseSeeder extends Seeder
{
    public function run()
    {

        $teachers = [
            [
                'name' => 'Елена Васильева',
                'role' => 'Преподаватель каллиграфии',
                'description' => 'Художник-график с 15-летним стажем. Обучает детей искусству красивого письма по методикам китайской и европейской каллиграфии.',
                'image' => '/public/images/1.jpg',
                'subjects' => ['Каллиграфия', 'ИЗО'],
                'languages' => [],
                'sort_order' => 1
            ],
            [
                'name' => 'Елена Петрова',
                'role' => 'Педагог раннего развития',
                'description' => 'Специалист по раннему развитию, автор игровых методик. Занятия проходят на английском языке в игровой форме.',
                'image' => '/public/images/4.jpg',
                'subjects' => ['Раннее развитие'],
                'languages' => ['English'],
                'sort_order' => 2
            ],
            [
                'name' => 'Наталия Соколова',
                'role' => 'Музыкальный руководитель',
                'description' => 'Выпускник консерватории, лауреат международных конкурсов. Развивает музыкальный слух и чувство ритма через игру.',
                'image' => '/public/images/3.jpg',
                'subjects' => ['Музыка', 'Вокал'],
                'languages' => [],
                'sort_order' => 3
            ],
            [
                'name' => 'Ольга Миронова',
                'role' => 'Детский психолог',
                'description' => 'Кандидат психологических наук, специалист по эмоциональному интеллекту. Помогает детям адаптироваться и разрешать конфликты.',
                'image' => '/public/images/2.jpg',
                'subjects' => ['Психология', 'Адаптация'],
                'languages' => [],
                'sort_order' => 4
            ],
            [
                'name' => 'Иван Петров',
                'role' => 'Преподаватель физкультуры',
                'description' => 'Мастер спорта по гимнастике, инструктор ЛФК. Проводит весёлые разминки, обучает основам здорового образа жизни.',
                'image' => '/public/images/7.jpg',
                'subjects' => ['Физкультура', 'ЛФК'],
                'languages' => [],
                'sort_order' => 5
            ],
            [
                'name' => 'Наталья Григорьева',
                'role' => 'Логопед-дефектолог',
                'description' => 'Специалист высшей категории. Занимается постановкой звуков, развитием речи и профилактикой нарушений письма.',
                'image' => '/public/images/6.jpg',
                'subjects' => ['Логопедия', 'Развитие речи'],
                'languages' => [],
                'sort_order' => 6
            ],
            [
                'name' => 'Ольга Морозова',
                'role' => 'Художник-педагог',
                'description' => 'Художник-иллюстратор, преподаватель ИЗО и ДПИ. Владеет техниками правополушарного рисования и арт-терапии.',
                'image' => '/public/images/8.jpg',
                'subjects' => ['Рисование', 'Лепка'],
                'languages' => [],
                'sort_order' => 7
            ],
            [
                'name' => 'Мария Козлова',
                'role' => 'Педагог раннего развития',
                'description' => 'Психолог дошкольного образования, специалист по билингвальному развитию. Ведёт группы на английском и русском языках.',
                'image' => '/public/images/5.jpg',
                'subjects' => ['Раннее развитие'],
                'languages' => ['English'],
                'sort_order' => 8
            ],
        ];

        foreach ($teachers as $teacher) {
            Teacher::create($teacher);
        }


        $upcomingEvents = [
            [
                'title' => 'Час Чтения',
                'type' => 'upcoming',
                'event_date' => '2024-02-22',
                'time' => '14:00–15:30',
                'duration' => '90 минут',
                'description' => 'Приглашаем малышей послушать сказки и обсудить героев.',
                'icon' => 'FaCalendarCheck',
                'sort_order' => 1
            ],
            [
                'title' => 'Музыкальная и Танцевальная Вечеринка',
                'type' => 'upcoming',
                'event_date' => '2024-02-22',
                'time' => '14:00–15:30',
                'duration' => '90 минут',
                'description' => 'Танцы, хороводы, музыкальные игры.',
                'icon' => 'FaCalendarCheck',
                'sort_order' => 2
            ],
            [
                'title' => 'Праздник Культур',
                'type' => 'upcoming',
                'time' => '14:30–15:30',
                'duration' => '90 мин',
                'description' => 'Знакомство с традициями разных стран.',
                'icon' => 'FaCalendarCheck',
                'sort_order' => 3
            ],
            [
                'title' => 'Прогулка На Природе',
                'type' => 'upcoming',
                'event_date' => '2024-03-15',
                'time' => '14:30–15:30',
                'duration' => '60 минут',
                'description' => 'Наблюдаем за птицами, собираем листья.',
                'icon' => 'FaCalendarCheck',
                'sort_order' => 4
            ],
        ];

        $archiveEvents = [
            [
                'title' => 'Час Чтения',
                'type' => 'archive',
                'event_date' => '2024-02-22',
                'time' => '16:00–17:30',
                'icon' => 'FaArchive',
                'sort_order' => 1
            ],
            [
                'title' => 'Музыкальная и Танцевальная Вечеринка',
                'type' => 'archive',
                'time' => '16:00–17:30',
                'duration' => '90 минут',
                'icon' => 'FaArchive',
                'sort_order' => 2
            ],
            [
                'title' => 'Праздник Культур',
                'type' => 'archive',
                'event_date' => '2024-10-26',
                'time' => '16:00–17:30',
                'icon' => 'FaArchive',
                'sort_order' => 3
            ],
        ];

        foreach (array_merge($upcomingEvents, $archiveEvents) as $event) {
            Event::create($event);
        }


        $news = [
            [
                'title' => 'Преимущества игрового обучения для детей дошкольного возраста',
                'date' => '2024-02-10',
                'image' => '/public/images/новость1.jpg',
                'views' => 245,
                'excerpt' => 'Исследования показывают, что дети лучше усваивают материал через игру. В нашей статье рассказываем о методиках игрового обучения...',
                'content' => '<span> 10 февраля 2026</span><span> 245 просмотров</span></div><div class="modal-news-content"><h4>Почему игра — это важно?</h4><p>Игровое обучение — это не просто развлечение, а мощный педагогический инструмент. Когда дети играют, они развивают социальные навыки, тренируют память и внимание, развивают творческое мышление.</p><h4>Методики игрового обучения в "Знайке"</h4><ul><li><strong>Сюжетно-ролевые игры</strong> — дети примеряют на себя разные профессии</li><li><strong>Дидактические игры</strong> — обучающие игры с четкими правилами</li><li><strong>Подвижные игры</strong> — развивают координацию</li><li><strong>Конструирование</strong> — развивает пространственное мышление</li></ul></div>',
                'tags' => ['Игровое обучение', 'Развитие детей', 'Методики']
            ],
            [
                'title' => 'Создание безопасной и инклюзивной среды в детском саду',
                'date' => '2024-03-15',
                'image' => '/public/images/новость2.jpg',
                'views' => 189,
                'excerpt' => 'Как сделать детский сад комфортным для каждого ребенка, включая детей с особенностями развития...',
                'content' => '<span> 05 марта 2026</span><span> 189 просмотров</span></div><div class="modal-news-content"><h4>Что такое инклюзивная среда?</h4><p>Инклюзивная среда — это пространство, где каждый ребенок чувствует себя принятым и защищенным.</p><h4>Наши принципы безопасности</h4><ul><li>Физическая безопасность</li><li>Эмоциональная безопасность</li><li>Социальная инклюзия</li></ul></div>',
                'tags' => ['Безопасность', 'Инклюзия', 'Детский сад']
            ],
            [
                'title' => 'Советы по питанию для здоровых перекусов',
                'date' => '2024-02-22',

                'views' => 312,
                'excerpt' => 'Простые и полезные рецепты перекусов, которые понравятся детям и сэкономят время родителям...',
                'content' => '<span> 22 февраля 2026</span><span> 312 просмотров</span></div><div class="modal-news-content"><h4>Топ-5 полезных перекусов</h4><ol><li>Фруктовые шашлычки</li><li>Овощные палочки с хумусом</li><li>Домашние мюсли-батончики</li><li>Йогуртовые парфе</li><li>Смузи-боулы</li></ol></div>',
                'tags' => ['Питание', 'Рецепты', 'Здоровье']
            ],
            [
                'title' => 'Идеи для творческих проектов в детском саду',
                'date' => '2024-03-26',
                'image' => '/public/images/новость4.jpg',
                'views' => 156,
                'excerpt' => 'Вдохновляющие идеи для поделок и творческих занятий с детьми от 3 до 6 лет...',
                'content' => '<span> 06 марта 2026</span><span> 156 просмотров</span></div><div class="modal-news-content"><h4>Сезонные проекты</h4><ul><li>Осень: гербарий, поделки из листьев</li><li>Зима: снежинки, новогодние игрушки</li><li>Весна: цветы из бумаги</li><li>Лето: рисунки на асфальте</li></ul></div>',
                'tags' => ['Творчество', 'Поделки', 'Идеи']
            ],
        ];

        foreach ($news as $item) {
            News::create($item);
        }


        $reviews = [
            [
                'author' => 'Анна, мама Тимофея',
                'child_name' => 'Тимофей',
                'text' => 'Ребёнок бежит в сад каждое утро! Очень довольны программой и чуткими воспитателями. Знайка — наша вторая семья.',
                'rating' => 5,
                'date' => now()->subDays(10),
                'is_approved' => true
            ],
            [
                'author' => 'Игорь, папа Миши',
                'child_name' => 'Миша',

                'text' => 'После года в Знайке сын научился читать и считать, а главное — появилась тяга к знаниям. Спасибо команде!',
                'rating' => 5,
                'date' => now()->subDays(15),
                'is_approved' => true
            ],
            [
                'author' => 'Елена, мама Киры',
                'child_name' => 'Кира',

                'text' => 'Очень уютная атмосфера, ребёнок всегда с радостью рассказывает, как прошёл день. Отдельное спасибо за вкусное питание!',
                'rating' => 4,
                'date' => now()->subDays(20),
                'is_approved' => true
            ],
            [
                'author' => 'Дмитрий, папа Сони',
                'child_name' => 'Соня',

                'text' => 'Воспитатели настоящие профессионалы! Ребёнок с удовольствием ходит в сад, участвует во всех мероприятиях. Рекомендую!',
                'rating' => 5,
                'date' => now()->subDays(25),
                'is_approved' => true
            ],
            [
                'author' => 'Светлана, мама Артёма',
                'child_name' => 'Артём',

                'text' => 'Отличный сад! Ребёнок всегда сыт, доволен, занятия интересные. Особенно нравится подход к развитию речи.',
                'rating' => 5,
                'date' => now()->subDays(30),
                'is_approved' => true
            ],
        ];

        foreach ($reviews as $review) {
            Review::create($review);
        }


        $classRooms = [
            [
                'title' => 'Игровая комната',
                'description' => 'Просторное помещение с развивающими игрушками, конструкторами и зонами для сюжетно-ролевых игр',
                'image' => '/public/images/игровая.jpg',
                'icon_class' => 'FaCubes',
                'delay' => 100,
                'sort_order' => 1
            ],
            [
                'title' => 'Учебный класс',
                'description' => 'Светлая аудитория с современной мебелью, интерактивной доской и учебными материалами',
                'image' => '/public/images/учебный.jpg',
                'icon_class' => 'FaBookOpen',
                'delay' => 150,
                'margin_top' => 20,
                'sort_order' => 2
            ],
            [
                'title' => 'Спальня',
                'description' => 'Уютная комната для дневного сна с удобными кроватками и спокойной атмосферой',
                'image' => '/public/images/спальня.jpg',
                'icon_class' => 'FaBed',
                'delay' => 200,
                'margin_bottom' => 20,
                'sort_order' => 3
            ],
            [
                'title' => 'Столовая',
                'description' => 'Светлая столовая с удобной мебелью, где дети получают вкусное и полезное питание',
                'image' => '/public/images/столовая.jpg',
                'icon_class' => 'FaUtensils',
                'delay' => 250,
                'sort_order' => 4
            ],
            [
                'title' => 'Спортивный зал',
                'description' => 'Зал для физкультуры с мягким покрытием, шведскими стенками и спортивным инвентарем',
                'image' => '/public/images/спортзал.jpg',
                'icon_class' => 'FaFutbol',
                'delay' => 300,
                'margin_top' => 30,
                'sort_order' => 5
            ],
            [
                'title' => 'Музыкальный класс',
                'description' => 'Помещение для занятий музыкой с фортепиано, детскими музыкальными инструментами',
                'image' => '/public/images/музык.jpg',
                'icon_class' => 'FaMusic',
                'delay' => 350,
                'margin_bottom' => 30,
                'sort_order' => 6
            ],
            [
                'title' => 'Художественная мастерская',
                'description' => 'Творческое пространство для рисования, лепки и поделок с большим выбором материалов',
                'image' => '/public/images/изо.jpg',
                'icon_class' => 'FaPaintBrush',
                'delay' => 400,
                'sort_order' => 7
            ],
            [
                'title' => 'Каллиграфия',
                'description' => 'Специализированный класс для обучения красивому письму с китайской методикой',
                'image' => '/public/images/калиграфия.jpg',
                'icon_class' => 'FaPenFancy',
                'delay' => 450,
                'margin_top' => 40,
                'sort_order' => 8
            ],
            [
                'title' => 'Зимний сад',
                'description' => 'Озелененное пространство для отдыха и знакомства с природой, ухода за растениями',
                'image' => '/public/images/зимний сад.png',
                'icon_class' => 'FaLeaf',
                'delay' => 500,
                'margin_bottom' => 40,
                'sort_order' => 9
            ],
            [
                'title' => 'Зона ожидания',
                'description' => 'Уютное пространство для родителей с информационными стендами и комфортными диванами',
                'image' => '/public/images/зал ожидания.jpg',
                'icon_class' => 'FaCouch',
                'delay' => 550,
                'sort_order' => 10
            ],
        ];

        foreach ($classRooms as $room) {
            ClassRoom::create($room);
        }


        $menuItems = [

            [
                'day' => 'monday',
                'category' => 'breakfast',
                'title' => 'Миска хлопьев на завтрак',
                'description' => 'Наша команда – это наши клиенты. Bounded art preferred – это возможность доставить нам в разы больше удовольствия.',
                'image' => '/public/images/меню-картинка.png',
                'sort_order' => 1
            ],
            [
                'day' => 'monday',
                'category' => 'breakfast',
                'title' => 'Овсяная каша с ягодами',
                'description' => 'Нежная овсяная каша на молоке с сезонными ягодами и медом.',
                'image' => '/public/images/wwwwww.png',
                'sort_order' => 2
            ],

            [
                'day' => 'monday',
                'category' => 'lunch',
                'title' => 'Вегетарианская паста',
                'description' => 'Наша команда – это наши клиенты. Bounded art preferred – это возможность доставить нам в разы больше удовольствия.',
                'image' => '/public/images/wwwwww.png',
                'sort_order' => 1
            ],
            [
                'day' => 'monday',
                'category' => 'lunch',
                'title' => 'Тыквенный суп-пюре',
                'description' => 'Ароматный суп из тыквы с кокосовым молоком и семечками.',
                'image' => '/public/images/меню-картинка.png',
                'sort_order' => 2
            ],

            [
                'day' => 'monday',
                'category' => 'dessert',
                'title' => 'Яблочный пирог с карамелью',
                'description' => 'Наша команда – это наши клиенты. Bounded art preferred – это возможность доставить нам в разы больше удовольствия.',
                'image' => '/public/images/меню-картинка.png',
                'sort_order' => 1
            ],
            [
                'day' => 'monday',
                'category' => 'dessert',
                'title' => 'Фруктовое мороженое',
                'description' => 'Натуральное мороженое из свежих фруктов без сахара.',
                'image' => '/public/images/wwwwww.png',
                'sort_order' => 2
            ],
        ];

        foreach ($menuItems as $item) {
            MenuItem::create($item);
        }


        $galleryItems = [
            [
                'category' => 'classes',
                'image' => '/public/images/по математике.jpg',
                'title' => '📐 Занятие по математике',
                'delay' => 0,
                'sort_order' => 1
            ],
            [
                'category' => 'classes',
                'image' => '/public/images/развитие речи.jpg',
                'title' => '🗣️ Развитие речи',
                'delay' => 50,
                'sort_order' => 2
            ],
            [
                'category' => 'holidays',
                'image' => '/public/images/новый год.jpg',
                'title' => '🎄 Новогодний утренник',
                'delay' => 100,
                'sort_order' => 3
            ],
            [
                'category' => 'holidays',
                'image' => '/public/images/день рождения.jpg',
                'title' => '🎂 День рождения',
                'delay' => 150,
                'sort_order' => 4
            ],
            [
                'category' => 'holidays',
                'image' => '/public/images/осенний.jpg',
                'title' => '🍂 Осенний бал',
                'delay' => 400,
                'sort_order' => 5
            ],
            [
                'category' => 'creativity',
                'image' => '/public/images/рисование.jpg',
                'title' => '🖌️ Рисование',
                'delay' => 200,
                'sort_order' => 6
            ],
            [
                'category' => 'creativity',
                'image' => '/public/images/лепка.jpg',
                'title' => '🏺 Лепка',
                'delay' => 250,
                'sort_order' => 7
            ],
            [
                'category' => 'sport',
                'image' => '/public/images/физра.jpg',
                'title' => '🤸 Физкультура',
                'delay' => 300,
                'sort_order' => 8
            ],
            [
                'category' => 'sport',
                'image' => '/public/images/подвиж.jpg',
                'title' => '🏃 Подвижные игры',
                'delay' => 350,
                'sort_order' => 9
            ],
        ];

        foreach ($galleryItems as $item) {
            Gallery::create($item);
        }


        $programs = [
            [
                'age_group' => '3-4 года',
                'title' => '«Любознайки»',
                'description' => 'Промежуточное звено между базовыми и специальными навыками. Создаём прочный фундамент знаний.',
                'badge_color' => '#58b4ae',
                'features' => [
                    'Усвоение и отработка навыка чтения, развитие связной речи',
                    'Математические навыки: счёт, сравнение, геометрические фигуры',
                    'Постановка руки к письму (пальчиковая гимнастика, прописи)',
                    'Развитие логического мышления и социальных навыков с психологом',
                    'Расширение кругозора: музыка, живопись, физика, анатомия, география',
                    'Знакомство с английским (в группах «Clever Kids») — стихи, песни, произношение',
                ],
                'sort_order' => 1
            ],
            [
                'age_group' => '4-5 лет',
                'title' => '«Следопыты»',
                'description' => 'Комплексное развитие: интеллектуальное, физическое, психологическое.',
                'badge_color' => '#f9d56e',
                'features' => [
                    'Отработка чтения (буквы/звуки, выразительность, составление слов)',
                    'Математика до 20, сложение/вычитание, основы геометрии, величины',
                    'Подготовка руки к письму, тренировка мышц, списывание',
                    'Физическое развитие: равновесие, координация, танцы, фитнес',
                    'Дополнительные дисциплины: география, анатомия, физика, история',
                    'Творчество, обсуждение искусства, креативно-интеллектуальный тренинг с психологом',
                    'Английский язык: фразы, диалоги, стихи, правильное произношение',
                ],
                'sort_order' => 2
            ],
            [
                'age_group' => '5-7 лет',
                'title' => '«Эрудиты»',
                'description' => 'Адаптация к школе + игры, танцы, творчество и физкультура.',
                'badge_color' => '#a3d8c5',
                'features' => [
                    'Чтение: произношение, выразительность, составление рассказов',
                    'Математика до 1000, десятки/сотни, примеры, задачи, величины',
                    'Письмо: карандаш, ручка, печатные и прописные буквы',
                    'Ритмика, танцы, фитнес, хореография',
                    'Доп. дисциплины: география, анатомия, физика, химия, биология, страноведение',
                    'Мировая культура, основы психологии, актёрское мастерство',
                    'Совершенствование английского: говорение, чтение',
                ],
                'sort_order' => 3
            ],
        ];

        foreach ($programs as $program) {
            Program::create($program);
        }


        $pricingPlans = [
            [
                'title' => 'Базовый',
                'price' => 35000,
                'period' => '/мес',
                'description' => 'Первая половина дня с 8:00 до 13:00',
                'features' => [
                    ['text' => 'Пребывание с 8:00 до 13:00', 'included' => true],
                    ['text' => 'Завтрак и второй завтрак', 'included' => true],
                    ['text' => 'Развивающие занятия', 'included' => true],
                    ['text' => 'Прогулка на свежем воздухе', 'included' => true],
                    ['text' => 'Игры и творчество', 'included' => true],
                    ['text' => 'Дневной сон', 'included' => false],
                    ['text' => 'Обед', 'included' => false],
                ],
                'is_popular' => false,
                'sort_order' => 1
            ],
            [
                'title' => 'Стандарт +',
                'price' => 48000,
                'period' => '/мес',
                'description' => 'Первая половина дня + дополнительное занятие',
                'features' => [
                    ['text' => 'Пребывание с 8:00 до 13:00', 'included' => true],
                    ['text' => 'Завтрак и второй завтрак', 'included' => true],
                    ['text' => 'Развивающие занятия', 'included' => true],
                    ['text' => 'Прогулка на свежем воздухе', 'included' => true],
                    ['text' => 'Игры и творчество', 'included' => true],
                    ['text' => 'Доп. занятие (английский/каллиграфия)', 'included' => true],
                    ['text' => 'Индивидуальный подход', 'included' => true],
                    ['text' => 'Дневной сон', 'included' => false],
                ],
                'is_popular' => true,
                'sort_order' => 2
            ],
            [
                'title' => 'Полный день',
                'price' => 65000,
                'period' => '/мес',
                'description' => 'Полноценный день с 8:00 до 18:00',
                'features' => [
                    ['text' => 'Пребывание с 8:00 до 18:00', 'included' => true],
                    ['text' => '5-разовое питание', 'included' => true],
                    ['text' => 'Развивающие занятия', 'included' => true],
                    ['text' => 'Прогулки (утро/вечер)', 'included' => true],
                    ['text' => 'Дневной сон', 'included' => true],
                    ['text' => 'Игры и творчество', 'included' => true],
                    ['text' => 'Подготовка к школе', 'included' => true],
                ],
                'is_popular' => false,
                'sort_order' => 3
            ],
        ];

        foreach ($pricingPlans as $plan) {
            PricingPlan::create($plan);
        }


        $faqs = [

            [
                'category' => 'general',
                'question' => 'Какие услуги вы предлагаете?',
                'answer' => 'Мы предлагаем полный спектр услуг по уходу и развитию детей от 3 до 6 лет: развивающие занятия, подготовка к школе, английский язык, творческие мастерские, музыка, физкультура, логопед и психолог.',
                'sort_order' => 1
            ],
            [
                'category' => 'general',
                'question' => 'Как работает ваше ценообразование?',
                'answer' => 'Стоимость зависит от выбранного тарифа и дополнительных занятий. Все цены фиксированы на учебный год, индексация не чаще одного раза в год.',
                'sort_order' => 2
            ],
            [
                'category' => 'general',
                'question' => 'Как я могу записать ребенка?',
                'answer' => 'Вы можете записаться по телефону +7 (495) 666-33-99, через форму на сайте или лично посетить наш сад в рабочее время.',
                'sort_order' => 3
            ],
            [
                'category' => 'general',
                'question' => 'Могу ли я отменить регистрацию?',
                'answer' => 'Да, вы можете отменить регистрацию за 2 недели до планируемой даты начала посещения. Внесите предоплату за первый месяц, она будет возвращена в полном объеме.',
                'sort_order' => 4
            ],
            [
                'category' => 'general',
                'question' => 'Могу ли я прийти лично для регистрации?',
                'answer' => 'Конечно! Мы всегда рады гостям. Ждем вас по адресу: ул. Весенняя, 15 с 9:00 до 18:00 в будние дни.',
                'sort_order' => 5
            ],

            [
                'category' => 'payment',
                'question' => 'Какие способы оплаты вы принимаете?',
                'answer' => 'Мы принимаем оплату наличными, банковской картой, по QR-коду, а также безналичный расчет для юридических лиц с предоставлением всех закрывающих документов.',
                'sort_order' => 1
            ],
            [
                'category' => 'payment',
                'question' => 'Существуют ли какие-либо дополнительные сборы?',
                'answer' => 'Нет, все сборы включены в стоимость тарифа. Дополнительно оплачиваются только экскурсии и праздничные мероприятия (по желанию).',
                'sort_order' => 2
            ],
            [
                'category' => 'payment',
                'question' => 'Есть ли скидки на второго ребенка?',
                'answer' => 'Да, мы предоставляем скидку 10% на посещение для второго ребенка из одной семьи.',
                'sort_order' => 3
            ],
            [
                'category' => 'payment',
                'question' => 'Как производится возврат при пропусках?',
                'answer' => 'При пропуске по болезни (со справкой) производится перерасчет за пропущенные дни. При пропуске без уважительной причины оплата не возвращается.',
                'sort_order' => 4
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::create($faq);
        }


        $settings = [
            [
                'key' => 'contact_phone',
                'value' => '+7 (495) 666-33-99',
                'type' => 'text',
                'group' => 'contact'
            ],
            [
                'key' => 'contact_email',
                'value' => 'hello@znaika.ru',
                'type' => 'text',
                'group' => 'contact'
            ],
            [
                'key' => 'contact_address',
                'value' => 'ул. Весенняя, 15, г. Москва',
                'type' => 'text',
                'group' => 'contact'
            ],
            [
                'key' => 'work_hours',
                'value' => 'Пн-Пт: 9:00 - 18:00',
                'type' => 'text',
                'group' => 'contact'
            ],
            [
                'key' => 'telegram_link',
                'value' => 'https://t.me/znaika_bot',
                'type' => 'text',
                'group' => 'social'
            ],
            [
                'key' => 'vk_link',
                'value' => 'https://vk.com/',
                'type' => 'text',
                'group' => 'social'
            ],
            [
                'key' => 'ok_link',
                'value' => 'https://ok.ru/',
                'type' => 'text',
                'group' => 'social'
            ],
        ];

        foreach ($settings as $setting) {
            Setting::create($setting);
        }
    }
}
