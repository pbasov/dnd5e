/**
 *
 */
export default class JournalEntryPage5e extends JournalEntryPage {

  /** @inheritdoc */
  async prepareDerivedData() {
    if ( !this.system.itemUUID ) return;

    this.system.linkedItem = await fromUuid(this.system.itemUUID);
    if ( !this.system.linkedItem ) return;

    this._prepareFeatures();
  }

  /* -------------------------------------------- */

  /**
   * Prepare features for the advancement & optional features tables.
   */
  _prepareFeatures() {
    const primary = {};
    const optional = {};
    for ( const level of Array.fromRange(CONFIG.DND5E.maxLevel, 1) ) {
      primary[level] = { items: [], text: [] };
      optional[level] = { items: [], text: [] };
    }

    for ( const advancement of Object.values(this.system.linkedItem.advancement.byId) ) {
      switch ( advancement.constructor.typeName ) {
        case "ItemGrant":
          const target = advancement.data.configuration.optional ? optional : primary;
          target[advancement.levels[0]].items.push(...advancement.data.configuration.items);
          break;
      }
    }

    this.system.primaryTable = primary;
    this.system.optionalTable = optional;
  }

}
