<script setup lang="ts">
withDefaults(
  defineProps<{
    tags?: string[];
    small?: boolean;
    wrapperClass?: string;
  }>(),
  {
    tags: () => [],
    small: false,
    wrapperClass: '',
  },
);

const { allTags } = storeToRefs(useTagStore());
</script>

<template>
  <div
    v-if="tags && tags.length > 0"
    class="mt-2 flex flex-wrap items-center gap-1"
    :class="wrapperClass"
  >
    <TagIcon
      v-for="tag in tags"
      :key="tag"
      :small="small"
      :tag="allTags[tag]"
    />
  </div>
</template>
