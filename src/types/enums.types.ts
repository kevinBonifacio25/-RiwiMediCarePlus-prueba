/**
 * Define los roles disponibles para los usuarios del sistema.
 */
export enum UserRole {
  /**
   * Administrador con permisos completos del sistema.
   */
  ADMIN = "ADMIN",

  /**
   * Encargado de gestionar solicitudes de abastecimiento.
   */
  REQUEST_MANAGER = "REQUEST_MANAGER"
}

/**
 * Representa el estado lógico de un registro en la base de datos.
 */
export enum RecordStatus {
  /**
   * El registro está activo y disponible para uso normal.
   */
  ACTIVE = "ACTIVE",

  /**
   * El registro ha sido eliminado lógicamente.
   */
  DELETED = "DELETED"
}

/**
 * Define los estados posibles de una solicitud de abastecimiento.
 */
export enum RequestStatus {
  /**
   * La solicitud está pendiente de revisión.
   */
  PENDING = "PENDING",

  /**
   * La solicitud fue aprobada.
   */
  APPROVED = "APPROVED",

  /**
   * La solicitud fue rechazada.
   */
  REJECTED = "REJECTED",

  /**
   * La solicitud fue completada satisfactoriamente.
   */
  COMPLETED = "COMPLETED"
}
