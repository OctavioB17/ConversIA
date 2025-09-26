/**
 * Port for publishing domain events.
 * Defines the contract for event publishing without implementation details.
 */
export default interface EventPublisherPort {
	/**
   * Publishes a domain event.
   * @param event Domain event to publish.
   * @throws Error if publishing fails.
   */
	publish(event: unknown): Promise<void>;

	/**
   * Publishes multiple domain events.
   * @param events Array of domain events to publish.
   * @throws Error if publishing fails.
   */
	publishMany(events: unknown[]): Promise<void>;
}
