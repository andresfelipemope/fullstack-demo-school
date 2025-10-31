from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0001_initial'),
    ]

    operations = [
    ]

    def create_initial_students(apps, schema_editor):
        Student = apps.get_model('students', 'Student')
        StudentGroup = apps.get_model('students', 'StudentGroup')

        group, _ = StudentGroup.objects.get_or_create(
            name="Grupo 1",
            defaults={"room_number": "101"}
        )

        students_data = [
            {
                "code": "1151783",
                "full_name": "Espinoza Fernandez Diego Mauricio",
                "email": "diegomauricioef@ufps.edu.co"
            },
            {
                "code": "1152348",
                "full_name": "Ortiz Amaya Angie Nikol",
                "email": "angienikoloa@ufps.edu.co"
            },
            {
                "code": "1152349",
                "full_name": "Corredor Jaramillo Santiago",
                "email": "santiagocj@ufps.edu.co"
            },
            {
                "code": "1152351",
                "full_name": "Torres Daza Jesus Gabriel",
                "email": "jesusgabrieltd@ufps.edu.co"
            },
            {
                "code": "1152353",
                "full_name": "Monsalve Perez Andres Felipe",
                "email": "andresfelipemope@ufps.edu.co"
            },
            {
                "code": "1152356",
                "full_name": "Bueno Rojas Johan Steven",
                "email": "johanstevenbr@ufps.edu.co"
            },
            {
                "code": "1152358",
                "full_name": "Bulla Rey Israel",
                "email": "israelbr@ufps.edu.co"
            },
            {
                "code": "1152359",
                "full_name": "Peñaranda Nieto Sebastian",
                "email": "sebastianpeni@ufps.edu.co"
            },
            {
                "code": "1152361",
                "full_name": "Alba Lopez Ruben David",
                "email": "rubendavidallo@ufps.edu.co"
            },
            {
                "code": "1152362",
                "full_name": "Contreras Florez Jaider Ricardo",
                "email": "jaiderricardocf@ufps.edu.co"
            },
            {
                "code": "1152365",
                "full_name": "Garcia Peñaranda Daniela",
                "email": "danielagp@ufps.edu.co"
            },
            {
                "code": "1152367",
                "full_name": "Arias Calvo Keyler Sneider",
                "email": "keylersneiderac@ufps.edu.co"
            },
            {
                "code": "1152368",
                "full_name": "Cepeda Galeano Santiago Danilo",
                "email": "santiagodanilocg@ufps.edu.co"
            },
            {
                "code": "1152369",
                "full_name": "Ovallos Torrado Alejandro",
                "email": "alejandroot@ufps.edu.co"
            },
            {
                "code": "1152375",
                "full_name": "Pérez Rodriguez José Manuel",
                "email": "josemanuelpr@ufps.edu.co"
            },
            {
                "code": "1152376",
                "full_name": "Sarmiento Barroyeta Juan Diego",
                "email": "juandiegosb@ufps.edu.co"
            },
            {
                "code": "1152382",
                "full_name": "Arias Villamizar Kevin David",
                "email": "kevindavidav@ufps.edu.co"
            },
            {
                "code": "1152384",
                "full_name": "Jimenez Bayona Jose Luis",
                "email": "joseluisjb@ufps.edu.co"
            },
            {
                "code": "1152411",
                "full_name": "Chaparro Molina Kevin Daniel",
                "email": "kevindanielcm@ufps.edu.co"
            },
            {
                "code": "1152427",
                "full_name": "Bermudez Puentes Daniel Mauricio",
                "email": "danielmauriciobp@ufps.edu.co"
            },
            {
                "code": "1152435",
                "full_name": "Iscala Jurado Sebastian",
                "email": "sebastianij@ufps.edu.co"
            },
        ]

        for student in students_data:
            Student.objects.get_or_create(
                code=student["code"],
                defaults={
                    "full_name": student["full_name"],
                    "email": student["email"],
                    "group": group
                }
            )

    def reverse_create_initial_students(apps, schema_editor):
        Student = apps.get_model('students', 'Student')
        codes = [
            "1151783","1152348","1152349","1152351","1152353","1152356","1152358","1152359",
            "1152361","1152362","1152365","1152367","1152368","1152369","1152375","1152376",
            "1152382","1152384","1152411","1152427","1152435"
        ]
        Student.objects.filter(code__in=codes).delete()


    operations = [
        migrations.RunPython(create_initial_students, reverse_create_initial_students),
    ]
