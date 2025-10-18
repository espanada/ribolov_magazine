<<<<<<< HEAD
import java.security.MessageDigest;

public class RobokassaSignature {
    public static String md5(String input) throws Exception {
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] messageDigest = md.digest(input.getBytes("UTF-8"));
        StringBuilder sb = new StringBuilder();
        for (byte b : messageDigest) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }

    /**
     * Генерирует подпись для Robokassa
     * @param merchantLogin Логин магазина
     * @param outSum Сумма платежа
     * @param invId Номер заказа
     * @param password1 Пароль #1 из личного кабинета Robokassa
     * @return MD5-подпись
     */
    public static String generateSignature(String merchantLogin, String outSum, String invId, String password1) throws Exception {
        String signStr = merchantLogin + ":" + outSum + ":" + invId + ":" + password1;
        return md5(signStr);
    }

    public static void main(String[] args) throws Exception {
        // Пример использования
        String merchantLogin = "demo";
        String outSum = "1000";
        String invId = "1";
        String password1 = "test_password_1";
        String signature = generateSignature(merchantLogin, outSum, invId, password1);
        System.out.println("SignatureValue: " + signature);
    }
}
=======
import java.security.MessageDigest;

public class RobokassaSignature {
    public static String md5(String input) throws Exception {
        MessageDigest md = MessageDigest.getInstance("MD5");
        byte[] messageDigest = md.digest(input.getBytes("UTF-8"));
        StringBuilder sb = new StringBuilder();
        for (byte b : messageDigest) {
            sb.append(String.format("%02x", b));
        }
        return sb.toString();
    }

    /**
     * Генерирует подпись для Robokassa
     * @param merchantLogin Логин магазина
     * @param outSum Сумма платежа
     * @param invId Номер заказа
     * @param password1 Пароль #1 из личного кабинета Robokassa
     * @return MD5-подпись
     */
    public static String generateSignature(String merchantLogin, String outSum, String invId, String password1) throws Exception {
        String signStr = merchantLogin + ":" + outSum + ":" + invId + ":" + password1;
        return md5(signStr);
    }

    public static void main(String[] args) throws Exception {
        // Пример использования
        String merchantLogin = "demo";
        String outSum = "1000";
        String invId = "1";
        String password1 = "test_password_1";
        String signature = generateSignature(merchantLogin, outSum, invId, password1);
        System.out.println("SignatureValue: " + signature);
    }
}
>>>>>>> 63f4646d109376eec9376909fe0d82dddb2648f3
