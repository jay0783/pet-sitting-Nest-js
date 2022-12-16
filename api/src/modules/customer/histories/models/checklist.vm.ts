import { OrderCheckActionEntity, OrderCheckEntity } from '@pawfect/db/entities';

export interface ChecklistViewModel {
  id: string;
  name: string;
  numOrder: number;
  imageUrl: string | null;
  attachmentUrls: Array<string>;
  actions: Array<ActionChecklistViewModel>;
  updatedAt: number;
}

export async function makeChecklistViewModel(
  checklistEntity: OrderCheckEntity,
): Promise<ChecklistViewModel> {
  const checklistLogo = await checklistEntity.logo;
  const attachmentsEntities = await checklistEntity.attachments;
  const actionsEntities = await checklistEntity.actions;

  const attachmentsUrls: Array<string> = [];
  await Promise.all(
    attachmentsEntities.map((attachment) =>
      attachment.photo.then((photo) => {
        if (photo) {
          attachmentsUrls.push(photo.url);
        }
      }),
    ),
  );

  const actionsViewModelsPromises: Array<
    Promise<ActionChecklistViewModel>
  > = actionsEntities.map((action) => makeActionChecklistViewModel(action));
  const actionsViewModels = await Promise.all(actionsViewModelsPromises);

  const viewModel: ChecklistViewModel = {
    id: checklistEntity.id,
    name: checklistEntity.name,
    numOrder: checklistEntity.numOrder,
    imageUrl: checklistLogo?.url || null,
    attachmentUrls: attachmentsUrls,
    actions: actionsViewModels,
    updatedAt: checklistEntity.updatedAt.getTime(),
  };

  return viewModel;
}

export interface ActionChecklistViewModel {
  name: string;
  time: number;
}

export async function makeActionChecklistViewModel(
  actionChecklist: OrderCheckActionEntity,
): Promise<ActionChecklistViewModel> {
  return <ActionChecklistViewModel>{
    name: actionChecklist.name,
    time: actionChecklist.time.getTime(),
  };
}