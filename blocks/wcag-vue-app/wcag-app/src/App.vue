<!-- <script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style> -->

<template>
  <div id="app">
    <div>
      <h2>Filter by tags</h2>
      <div v-for="tag in uniqueTags" :key="tag">
        <input type="checkbox" :id="tag" :value="tag" v-model="selectedTags" />
        <label :for="tag">{{ tag }}</label>
      </div>
    </div>

    <div class="card-container">
      <div v-for="post in filteredPosts" :key="post.id" class="card">
        <h3>{{ post.title.rendered }}</h3>
        <p>{{ post.acf.test }}</p>
        <p>Tags: {{ post.tags.join(', ') }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],  // API response goes here
      selectedTags: [],
    };
  },

  computed: {
    uniqueTags() {
      return [...new Set(this.posts.flatMap(post => post.tags))];
    },

    filteredPosts() {
      if (this.selectedTags.length === 0) {
        return this.posts;
      }
      return this.posts.filter(post => post.tags.some(tag => this.selectedTags.includes(tag)));
    },
  },

  created() {
    // Fetch data from API when component is created
    this.fetchData();
  },

  methods: {
    async fetchData() {
      const url = 'http://localhost:10005/wp-json/wp/v2/wcag';  // Replace with your API URL
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("An error has occurred: " + response.status);
        }
        let posts = await response.json();

        // Get the unique URLs for fetching tags
        const tagUrls = [...new Set(posts.flatMap(post => post._links['wp:term'].map(link => link.href)))];

        // Fetch tags from each unique URL and store the response
        let tags = {};
        for (const tagUrl of tagUrls) {
          const tagResponse = await fetch(tagUrl);
          if (tagResponse.ok) {
            const tagData = await tagResponse.json();
            // Map each tag id to its name
            tagData.forEach(tag => { tags[tag.id] = tag.name });
          }
        }

        // Replace tag ids with tag names in posts
        posts.forEach(post => {
          post.tags = post.tags.map(tagId => tags[tagId] || tagId);
        });

        this.posts = posts;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.card {
  border: 1px solid #ccc;
  padding: 20px;
  margin: 20px;
  width: 200px;
}
</style>
