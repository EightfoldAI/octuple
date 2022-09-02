/* eslint-disable no-template-curly-in-string */
import type { Locale } from '../LocaleProvider';

const typeTemplate =
    "La valeur du champ ${label} n'est pas valide pour le type ${type}";

const localeValues: Locale = {
    locale: 'fr',
    Form: {
        optional: '(optionnel)',
        defaultValidateMessages: {
            default: 'Erreur de validation pour le champ ${label}',
            required: 'Le champ ${label} est obligatoire',
            enum: 'La valeur du champ ${label} doit être parmi [${enum}]',
            whitespace: 'La valeur du champ ${label} ne peut pas être vide',
            date: {
                format: "La valeur du champ ${label} n'est pas au format date",
                parse: 'La valeur du champ ${label} ne peut pas être convertie vers une date',
                invalid:
                    "La valeur du champ ${label} n'est pas une date valide",
            },
            types: {
                string: typeTemplate,
                method: typeTemplate,
                array: typeTemplate,
                object: typeTemplate,
                number: typeTemplate,
                date: typeTemplate,
                boolean: typeTemplate,
                integer: typeTemplate,
                float: typeTemplate,
                regexp: typeTemplate,
                email: typeTemplate,
                url: typeTemplate,
                hex: typeTemplate,
            },
            string: {
                len: 'La taille du champ ${label} doit être de ${len} caractères',
                min: 'La taille du champ ${label} doit être au minimum de ${min} caractères',
                max: 'La taille du champ ${label} doit être au maximum de ${max} caractères',
                range: 'La taille du champ ${label} doit être entre ${min} et ${max} caractères',
            },
            number: {
                len: 'La valeur du champ ${label} doit être égale à ${len}',
                min: 'La valeur du champ ${label} doit être plus grande que ${min}',
                max: 'La valeur du champ ${label} doit être plus petit que ${max}',
                range: 'La valeur du champ ${label} doit être entre ${min} et ${max}',
            },
            array: {
                len: 'La taille du tableau ${label} doit être de ${len}',
                min: 'La taille du tableau ${label} doit être au minimum de ${min}',
                max: 'La taille du tableau ${label} doit être au maximum de ${max}',
                range: 'La taille du tableau ${label} doit être entre ${min}-${max}',
            },
            pattern: {
                mismatch:
                    'La valeur du champ ${label} ne correspond pas au modèle ${pattern}',
            },
        },
    },
};

export default localeValues;
