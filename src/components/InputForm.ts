import { hbs } from '@glimmerx/component';
import { on } from '@glimmerx/modifier';
import { TC } from '@glint/environment-glimmerx/component';

interface InputFormSignature {
    Args: {
        logo: string;
        updateValue(e: any): void;
    },
    Element: HTMLDivElement
}

//@ts-ignore
const InputForm: TC<InputFormSignature> = hbs`
    <div class="flex" ...attributes>
        <div>
            <a href="/">
                <img alt="GlimmerX" class="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                    src={{@logo}} />
            </a>
        </div>
        <div class="flex-grow">
            <input placeholder="specify github username"
                class="shadow mt-2 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {{on 'change' @updateValue}} />
        </div>
    </div>
  `;

export default InputForm;