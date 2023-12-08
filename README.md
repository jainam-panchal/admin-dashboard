### These are the requirements :

1. Column titles must stand out from the entries.
2. There should be a search bar that can filter on any property.
3. You should be able to edit or delete rows in place.(There is no expectation of persistence. Edit and delete are expected to only happen in memory.)
4. You need to implement pagination: Each page contains 10 rows. Buttons at the bottom allow you to jump to any page including special buttons for first page, previous page, next page and last page. Pagination must update based on search/filtering. If there are 25 records for example that match a search query, then pagination buttons should only go till 3.
5. You should be able to select one or more rows. A selected row is highlighted with a grayish background color. Multiple selected rows can be deleted at once using the 'Delete Selected' button at the top right bin icon.
6. Checkbox on the top left is a shortcut to select or deselect all displayed rows. This should only apply to the ten rows displayed in the current page, and not all 50 rows.
7. Search box placeholder text should start with Search.
8. Search icon/button should have class as search-icon OR trigger search on ENTER.
9. Action element must be a button with a specific class name like edit, delete, save.
10. Navigation elements must be a div/button, and should have class name as first-page, previous-page, next-page and last-page and page numbers should be mentioned accordingly.
11. On clicking edit action in a row, it should be editable in the row itself.
12. feel free to use any libraries.
13. On executing, your application should be running successfully on deployed on vercel, netlify or any similar platform. 
14. after completing deployment. please submit [here](https://forms.gle/XAhSahQMFBayF6gq7).

**Note** :
The users are sorted by `id` field. There is no alphabetical sorting.

**Request Type :**
GET

**Endpoint :**
https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json

Sample Response :

```jsx
[
	{
	"id": "1",
	"name": "Aaron Miles",
	"email": "[aaron@mailinator.com](mailto:aaron@mailinator.com)",
	"role": "member"
	},
	{
	"id": "2",
	"name": "Aishwarya Naik",
	"email": "[aishwarya@mailinator.com](mailto:aishwarya@mailinator.com)",
	"role": "member"
	},
	{
	"id": "3",
	"name": "Arvind Kumar",
	"email": "[arvind@mailinator.com](mailto:arvind@mailinator.com)",
	"role": "admin"
	}
]

```


This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
