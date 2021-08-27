<template>
  <div>
    <CRow>


      <CCol sm="6" lg="3" v-for="game in games">
        <CWidgetDropdown 
            color="primary" 
            style="min-height:200px;"
            :header="game.name" 
            :text="game.description">
          <template #default>
            <CDropdown
              color="transparent p-0"
              placement="bottom-end"
            >
              <template #toggler-content>
                <CIcon name="cil-chart-line"/>
              </template>
              <CDropdownItem>Nuevo Análisis</CDropdownItem>
              <CDropdownItem>Ver Análisis</CDropdownItem>
            </CDropdown>
          </template>
          <template #footer>
            <CChartLineSimple
              pointed
              class="mt-3 mx-3"
              style="height:70px"
              :data-points="[65, 59, 84, 84, 51, 55, 40]"
              point-hover-background-color="primary"
              label="Members"
              labels="months"
            />
          </template>
        </CWidgetDropdown>
      </CCol>

    </CRow>
  </div>
</template>

<script>

import store from '../../store'
import { mapActions, mapState } from 'vuex'
import { CChartLineSimple, CChartBarSimple } from '../charts/index.js'

export default {
  name: 'AnalyticsList',
  components: { CChartLineSimple, CChartBarSimple },
  computed: {
    ...mapState(['games'])
  },
  methods: {
    ...mapActions(['getGamesList'])
  },
  created() {
    store.dispatch('getGamesList')
  },
}
</script>
