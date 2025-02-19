<script setup lang="ts">
import type { QueryTemplate } from 'naive-fusion-ui'
import { FAsyncSelect } from 'naive-fusion-ui'

interface User {
  id: number
  name: string
  fullName: string
}

const mockList = [
  { id: 1, name: 'John', fullName: 'John Frank' },
  { id: 2, name: 'Doe', fullName: 'Doe Ronan' },
]
async function queryFn(query: QueryTemplate<User>) {
  // sleep 1s to simulate the network request
  await new Promise(resolve => setTimeout(resolve, 1000))
  return {
    error: null,
    data: {
      // mock data
      list: (query.whereQuery?.length ?? 0) > 0 ? mockList.filter(item => item.name.includes(query.whereQuery?.[0].items?.[0].value)) : mockList,
      total: 2,
      pageNum: 1,
      pageSize: 10,
    },
  }
}
</script>

<template>
  <FAsyncSelect
    :query-fn="queryFn"
    :query-fields="[{ field: 'name', opr: 'like' }]"
    label-field="fullName"
  />
</template>
