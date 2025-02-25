<script setup lang="ts">
import { type Column, FTable } from 'naive-fusion-ui'
import { ref } from 'vue'

interface User {
  id: number
  name: string // string
  age: number // number
  birth: string // date
  title: 'manager' | 'finance' | 'hr' | 'engineer' //  select
}

const columns = ref<Column<User>[]>([
  { key: 'id', title: 'ID', width: 80 },
  { key: 'name', title: 'Name', width: 120, filterOption: { type: 'input' } },
  { key: 'age', title: 'Age', width: 80 },
  { key: 'birth', title: 'Birth', width: 120 },
  { key: 'title', title: 'Title', width: 120 },
])
</script>

<template>
  <FTable
    class="w-full"
    name="user-tbl"
    :columns="columns"
  />
</template>
