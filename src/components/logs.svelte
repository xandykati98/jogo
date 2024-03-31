<ul class="logs">
    {#each gameState.logs as log, i}
        <li class="log">{log.message}</li>
    {/each}
</ul>

<script lang="ts">
import { gameState } from '../stores/game';

</script>

<style lang="scss">
    .logs {
        position: absolute;
        bottom: 0;
        right: 0;
        font-size: 18px;
        width: 400px;
        height: 200px;
        background: rgb(236, 236, 236);
        padding: 4px;
        & > .log {
            background: white;
            border-radius: 5px;
            padding: 4px 8px;;
        }
    }
</style>