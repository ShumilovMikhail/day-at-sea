import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl } from '@angular/forms';
import { RulesListService } from './services/rules-list.service';

@Component({
  selector: 'account-add-object-rules-list-ui',
  standalone: true,
  imports: [CommonModule],
  providers: [RulesListService],
  templateUrl: './add-object-rules-list-ui.component.html',
  styleUrl: './add-object-rules-list-ui.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddObjectRulesListUiComponent {
  @Input({ required: true }) rulesArray!: FormArray<FormControl<string>>;
  private readonly rulesListService = inject(RulesListService);
  public readonly rulesList: string[] = this.rulesListService.list;

  public onCheckboxChange(isChecked: boolean, rule: string): void {
    if (isChecked) {
      this.onAddRule(rule);
    } else {
      this.onRemoveRule(rule);
    }
  }

  public hasRule(name: string): boolean {
    return this.rulesArray.value.includes(name);
  }

  private onAddRule(rule: string): void {
    this.rulesArray.push(new FormControl(rule) as FormControl<string>);
  }

  private onRemoveRule(rule: string): void {
    const index = this.rulesArray.controls.findIndex((control) => control.value === rule);
    if (index === -1) {
      throw Error('form rules list: the rule is not on the list');
    }
    this.rulesArray.removeAt(index);
  }
}
