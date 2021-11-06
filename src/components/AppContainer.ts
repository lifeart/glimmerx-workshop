import { hbs } from '@glimmerx/component';

const AppContainer: any = hbs`
<section class="text-gray-600 body-font">
    <div class="container px-5 py-24 mx-auto">
        <div class="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
            {{yield}}
        </div>
    </div>
</section>
`;


export default AppContainer;