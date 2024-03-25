package sueprtizen.smartclothing.socket;

public class GetMainLaundryListStrategy implements RequestStrategy {
    @Override
    public void execute(Long requestNumber) {
        // getMainLaundryList 요청에 대한 로직 구현
        System.out.println("Executing GetMainLaundryList with requestNumber: " + requestNumber);
    }
}