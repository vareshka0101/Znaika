<!DOCTYPE html>
<html lang="ru">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Новое сообщение с сайта</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }



        .content {
            background: #f9f9f9;
            padding: 30px;
            border: 1px solid #ddd;
            border-top: none;
            border-radius: 0 0 10px 10px;
        }

        .field {
            margin-bottom: 20px;
            padding: 15px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
        }

        .label {
            font-weight: bold;
            color: #ff8a5c;
            margin-bottom: 5px;
            font-size: 14px;
            text-transform: uppercase;
        }

        .value {
            font-size: 16px;
            color: #333;
        }

        .type-badge {
            display: inline-block;
            padding: 5px 15px;
            background: #58b4ae;
            color: white;
            border-radius: 20px;
            font-size: 14px;
            margin-bottom: 20px;
        }

        .footer {
            margin-top: 30px;
            text-align: center;
            color: #999;
            font-size: 12px;
        }
    </style>
</head>

<body>
    <div class="header">
        <h1>Детский сад "Знайка"</h1>
        <p>Новое сообщение с сайта</p>
    </div>

    <div class="content">
        @php
        $typeLabels = [
        'contact' => '📝 Обычная форма',
        'registration' => '🎯 Запись в сад',
        'excursion' => '🏫 Экскурсия'
        ];
        @endphp

        <div class="type-badge">
            {{ $typeLabels[$type] ?? 'Контактная форма' }}
        </div>

        <div class="field">
            <div class="label">👤 Имя</div>
            <div class="value">{{ $data['name'] ?? 'Не указано' }}</div>
        </div>

        <div class="field">
            <div class="label">📞 Телефон</div>
            <div class="value">{{ $data['phone'] ?? 'Не указан' }}</div>
        </div>

        @if(!empty($data['email']))
        <div class="field">
            <div class="label">✉️ Email</div>
            <div class="value">{{ $data['email'] }}</div>
        </div>
        @endif

        @if(!empty($data['message']))
        <div class="field">
            <div class="label">💬 Сообщение</div>
            <div class="value">{{ $data['message'] }}</div>
        </div>
        @endif

        @if(!empty($data['additional_data']))
        @php $additional = $data['additional_data']; @endphp

        @if(!empty($additional['child_name']))
        <div class="field">
            <div class="label">👶 Имя ребенка</div>
            <div class="value">{{ $additional['child_name'] }}</div>
        </div>
        @endif

        @if(!empty($additional['child_age']))
        <div class="field">
            <div class="label">📊 Возраст ребенка</div>
            <div class="value">{{ $additional['child_age'] }}</div>
        </div>
        @endif

        @if(!empty($additional['preferred_class']))
        <div class="field">
            <div class="label">🎨 Предпочитаемое направление</div>
            <div class="value">{{ $additional['preferred_class'] }}</div>
        </div>
        @endif

        @if(!empty($additional['preferred_date']))
        <div class="field">
            <div class="label">📅 Желаемая дата</div>
            <div class="value">{{ $additional['preferred_date'] }}</div>
        </div>
        @endif
        @endif

        <div class="field">
            <div class="label">⏰ Время отправки</div>
            <div class="value">{{ now()->format('d.m.Y H:i') }}</div>
        </div>
    </div>

    <div class="footer">
        <p>Это письмо отправлено автоматически с сайта детского сада "Знайка"</p>
        <p>© {{ date('Y') }} Знайка. Все права защищены.</p>
    </div>
</body>

</html>