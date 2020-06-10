import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | langPipe
*/
@Pipe({name: 'langPipe'})
export class LangPipe implements PipeTransform {


    dictionary = {
        search_field_label: 'Search Contacts',
        create_contact_title: 'Create',
        update_contact_title: 'Update',
        name_label: 'Name',
        id_label: 'Id',
        surname_label: 'Surname',
        phone_label: 'Phone',
        birthdate_label: 'Birthdate',
        choose_a_date: 'Choose a Date',
        this_field_cannot_be_empty: 'This field cannot be empty',
        postal_code_label: 'Postal Code',
        invalid_postal_code: 'Invalid postal code!',
        city_label: 'City',
        street_label: 'Street',
        invalid_input: 'Invalid value!',
        house_number_label: 'House Number',
        update_contact_button: 'Update Contact',
        create_contact_button: 'Create Contact',
        invalid_birthdate: 'The contacts should be older than 18 years old',
        enter_a_name_or_surname: 'Enter a name or surname'
    };

    transform(value: string): string {
        return this.dictionary[value];
    }
}
