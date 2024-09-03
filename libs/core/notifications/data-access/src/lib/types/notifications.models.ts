export interface DASNotification {
  message: string;
  type: DASNotificationTypes;
}

export type DASNotificationTypes = 'success' | 'info' | 'error';
