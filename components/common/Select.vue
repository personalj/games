<template>
  <div
    class="select-wrap"
    :class="selectClass"
  >
    <div
      v-click-outside="selectClick"
      class="select-container search"
      :class="{'active': isOptionsShown}"
    >
      <div
        class="select-trigger"
        @click="isOptionsShown = !isOptionsShown"
      >
        <slot />
        <div class="select-trigger__inner">
          <div
            class="select-value-item"
          >
            {{ selectedOption }}
          </div>
          <div class="select-trigger-icon">
            <TriangleIcon />
          </div>
        </div>
      </div>
      <transition name="slide-fade">
        <div
          v-if="isOptionsShown"
          class="select-dropdown"
        >
          <div
            v-for="option in selectOptions"
            :key="option.id"
            class="select-dropdown__item"
            :class="{'active': option.name === selectedOption}"
            @click="chooseOption(option)"
          >
            {{ option.name }}
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>
<script>
import TriangleIcon from '~/components/icons/common/TriangleIcon'
export default {
  name: 'SelectDefault',

  components: {
    TriangleIcon
  },

  props: {
    selectOptions: {
      type: Array,
      required: true,
      default: () => []
    },
    selectClass: {
      type: String,
      required: false,
      default: ''
    },
    selectValue: {
      type: String,
      required: false,
      default: ''
    }
  },

  data () {
    return {
      isOptionsShown: false,
      selectedOption: ''
    }
  },
  watch: {
    selectOptions (selectOptions) {
      this.selectedOptionsMount()
    },
    selectValue (selectValue) {
      this.selectedOptionsMount()
    }
  },
  mounted () {
    if (this.selectOptions.length) {
      this.selectedOptionsMount()
    }
  },
  methods: {
    chooseOption (option) {
      this.selectedOption = option.name
      this.isOptionsShown = false
      this.$emit('change', option.value)
    },
    selectClick (e) {
      this.isOptionsShown = false
    },
    selectedOptionsMount  () {
      if (this.selectValue) {
        this.selectOptions.forEach((item) => {
          if (item.value === this.selectValue) {
            this.selectedOption = item.name
          }
        })
        return
      }
      this.selectedOption = this.selectOptions[0].name
    }
  }
}
</script>
