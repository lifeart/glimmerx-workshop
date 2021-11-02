```ts
// @ts-ignore
const RepoLink: TemplateComponent<{Element: HTMLAnchorElement, Args: {
  login: string;
  repo: string;
} }> = hbs`<a ...attributes href="https://github.com/{{@login}}/{{@repo}}" target="_blank" rel="noopener noreferrer">{{@repo}}</a>`;


interface ListItemParams {
  Args: {
    name: string;
    login: string;
  }
}

// @ts-ignore
const ListItem: TemplateComponent<ListItemParams> = hbs`
<div
        class="flex justify-start cursor-pointer text-gray-700 hover:text-blue-400 hover:bg-blue-100 rounded-md px-2 py-2 my-2">
        <span class="bg-green-600 h-2 w-2 m-2 rounded-full min-w-[0.5rem]"></span>
        <div class="grid grid-cols-4 gap-4">
            <div class="col-span-2 text-left">
                <a class="flex-grow font-mono px-2 text-left" target="_blank" href="https://github.com/{{repo.login}}/{{repo.name}}" rel="noopener noreferrer" >{{repo.name}}</a>
            </div>
            <div class="col-span-2 text-justify">
                <div class="text-sm font-normal text-gray-500 tracking-wide">{{repo.description}}</div>
            </div>
        </div>
        </div>
`;
```