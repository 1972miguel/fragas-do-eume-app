---
import Layout from '../layouts/Layout.astro';
import { getCollection } from 'astro:content';

const patrimonios = await getCollection('patrimonio');
---

<Layout title="Patrimonio">
  <h1 class="text-2xl font-bold mb-4">Descubre las Fragas</h1>
  {patrimonios.map(post => (
    <article class="mb-6 p-4 border rounded">
      <h2 class="text-xl">{post.data.title}</h2>
      <p>{post.data.descripcion}</p>
      {post.data.imagen && <img src={post.data.imagen} alt={post.data.title} class="w-full max-w-md" loading="lazy" />}
    </article>
  ))}
</Layout>
