<template>
  <div class="filters">
    <div class="filters__item">
      <div class="filters__item-label">
        <strong>Order by:</strong>
      </div>
      <Select
        :select-options="sortOptions"
        :select-value="rating"
        @change="selectSort"
      />
    </div>
    <div class="filters__item">
      <div class="filters__item-label">
        <strong>Released:</strong>
      </div>
      <Select
        :select-options="dates"
        :select-value="released"
        @change="selectDates"
      />
    </div>
  </div>
</template>

<script>
import Select from '@/components/common/Select'

export default {
  name: 'FiltersItems',

  components: {
    Select
  },

  props: {
    released: {
      type: String,
      default: ''
    },
    rating: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      sortOptions: [
        {
          id: 1,
          name: 'Sort option',
          value: 'default'
        },
        {
          id: 2,
          name: 'Rating',
          value: 'rating'
        }
      ],
      dates: [
        {
          id: 0,
          name: 'Choose dates',
          value: 'default'
        },
        {
          id: 1,
          name: '2020-2022',
          value: '2020-01-01,2022-12-31'
        },
        {
          id: 2,
          name: '2010-2019',
          value: '2010-01-01,2019-12-31'
        },
        {
          id: 3,
          name: '2000-2009',
          value: '2000-01-01,2009-12-31'
        },
        {
          id: 4,
          name: '1990-1999',
          value: '1990-01-01,1999-12-31'
        },
        {
          id: 5,
          name: '1980-1989',
          value: '1980-01-01,1989-12-31'
        }
      ]
    }
  },
  methods: {
    selectDates (value) {
      this.$emit('selectDates', value)
    },
    selectSort (value) {
      this.$emit('selectSort', value)
    }
  }
}
</script>

<style lang="scss" scoped>
.filters {
  display: flex;
  flex-wrap: wrap;
  &__item {
    width: calc(50% - 10px);
    max-width: 260px;
    margin-right: 10px;
    &-label {
      font-size: 14px;
    }
  }
}
</style>
