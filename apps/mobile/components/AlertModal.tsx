import { View, Text, Pressable, StyleSheet, Modal } from "react-native";

interface AlertModalProps {
    visible: boolean;
    title: string;
    message: string;
    onCancel: () => void;
    onConfirm: () => void;
    cancelText?: string;
    confirmText?: string;
}

export function AlertModal({
    visible,
    title,
    message,
    onCancel,
    onConfirm,
    cancelText = "취소",
    confirmText = "확인",
}: AlertModalProps) {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                    <View style={styles.buttons}>
                        <Pressable style={styles.cancelButton} onPress={onCancel}>
                            <Text style={styles.cancelText}>{cancelText}</Text>
                        </Pressable>
                        <Pressable style={styles.confirmButton} onPress={onConfirm}>
                            <Text style={styles.confirmText}>{confirmText}</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 24,
        width: '80%',
        maxWidth: 320,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#212121',
        marginBottom: 8,
    },
    message: {
        fontSize: 15,
        color: '#616161',
        marginBottom: 24,
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 12,
    },
    cancelButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    cancelText: {
        color: '#757575',
        fontSize: 15,
        fontWeight: '500',
    },
    confirmButton: {
        backgroundColor: '#43A047',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    confirmText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500',
    },
});