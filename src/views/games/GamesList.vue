<template>
  <div>
    <CRow>
      <CCol>
        <CButton color="primary" variant="outline" class="m-2" to="/games/new">Nuevo Juego</CButton>
      </CCol>
    </CRow>
    <div style="padding:10px;"></div>
    <CRow>
      <CCol col="12" sm="6" lg="6" v-for="game in games">
        <CWidgetIcon
          :header="game.name"
          :text="game.description"
          color="primary"
          :icon-padding="false"
        >
          <CIcon :name="game.icon" width="24"/>
          <template #footer>
            <CCardFooter class="card-footer px-3 py-2">
              <CLink :to="'/games/view/'+game.id"
                class="font-weight-bold font-xs btn-block text-muted"
              >
                Ver mas
                <CIcon name="cil-arrowRight" class="float-right" width="16"/>
              </CLink>
            </CCardFooter>
          </template>
        </CWidgetIcon>
      </CCol>
    </CRow>

  </div>
</template>

<script>

import store from '../../store'
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'GamesData',
  components: {
  },
  computed: {
    ...mapState(['games'])
  },
  methods: {
    ...mapMutations(['loadGamesList']),
    ...mapActions(['getGamesList'])
  },
  created() {
    store.dispatch('getGamesList')
  },
}
</script>
